const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('teacherPanelModule.validateQuestions', () => {
  let dom;
  let teacherPanelModule;

  beforeAll(async () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../soru.html'), 'utf-8');
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost/'
    });

    await new Promise(resolve => {
      if (dom.window.document.readyState === 'complete' || dom.window.document.readyState === 'interactive') {
        resolve();
      } else {
        dom.window.document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
      }
    });

    dom.window.AudioContext = function () {
      return {
        currentTime: 0,
        createOscillator() {
          return {
            connect() {},
            start() {},
            stop() {},
            frequency: {
              setValueAtTime() {},
              linearRampToValueAtTime() {}
            }
          };
        },
        createGain() {
          return {
            connect() {},
            gain: {
              setValueAtTime() {},
              exponentialRampToValueAtTime() {}
            }
          };
        }
      };
    };
    dom.window.webkitAudioContext = dom.window.AudioContext;

    teacherPanelModule = dom.window.teacherPanelModule;
  });

  afterAll(() => {
    dom.window.close();
  });

  beforeEach(() => {
    teacherPanelModule.__setAllQuestionsForTesting([]);
  });

  test('reports missing required fields as errors', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        topic: 'İlk Türk Devletleri',
        difficulty: 'kolay',
        type: 'quiz',
        question: 'Göktürklerin başkenti neresidir?',
        options: ['Ötüken', 'Balasagun'],
        answer: 'Ötüken'
      }
    ]);

    expect(result.errors).toContain("Soru 1: 'grade' alanı eksik.");
    expect(result.validQuestions).toHaveLength(0);
  });

  test('accepts valid quiz question and warns about duplicates', () => {
    teacherPanelModule.__setAllQuestionsForTesting([
      {
        id: 1,
        type: 'quiz',
        question: 'Anadolu Selçuklu Devleti hangi yılda kurulmuştur?'
      }
    ]);

    const result = teacherPanelModule.validateQuestions([
      {
        grade: 6,
        topic: 'İlk Türk Devletleri',
        difficulty: 'kolay',
        type: 'quiz',
        question: 'Anadolu Selçuklu Devleti hangi yılda kurulmuştur?',
        options: ['1071', '1097', '1299'],
        answer: '1071'
      }
    ]);

    expect(result.errors).toHaveLength(0);
    expect(result.validQuestions).toHaveLength(1);
    expect(result.warnings).toContain('Soru 1: Benzer bir soru zaten mevcut.');
  });

  test("rejects fill-in question without placeholder or distractors", () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 6,
        topic: 'Cumhuriyet Tarihi',
        difficulty: 'orta',
        type: 'fill-in',
        sentence: 'Türkiye Cumhuriyeti 1923 yılında ilan edildi.',
        answer: '1923',
        distractors: []
      }
    ]);

    expect(result.errors).toContain("Soru 1: Cümle eksik veya '___' işareti yok.");
    expect(result.errors).toContain('Soru 1: En az 1 çeldirici gerekli.');
    expect(result.validQuestions).toHaveLength(0);
  });

  test('accepts valid fill-in question', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 6,
        topic: 'Cumhuriyet Tarihi',
        difficulty: 'kolay',
        type: 'fill-in',
        sentence: 'Türkiye\'nin başkenti ___.',
        answer: 'Ankara',
        distractors: ['İstanbul', 'İzmir']
      }
    ]);

    expect(result.errors).toHaveLength(0);
    expect(result.validQuestions).toHaveLength(1);
    expect(result.validQuestions[0]).toMatchObject({ answer: 'Ankara', type: 'fill-in' });
  });

  test('rejects matching question with missing pair data', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 7,
        topic: 'Türk-İslam Devletleri',
        difficulty: 'zor',
        type: 'matching',
        question: 'Liderleri ve devletleri eşleştirin.',
        pairs: [
          { term: 'Satuk Buğra Han', definition: 'Karahanlı Devleti' },
          { term: '', definition: 'Büyük Selçuklu Devleti' },
          { term: 'Melikşah', definition: '' }
        ]
      }
    ]);

    expect(result.errors).toContain('Soru 1, Çift 2: Terim ve açıklama gerekli.');
    expect(result.errors).toContain('Soru 1, Çift 3: Terim ve açıklama gerekli.');
    expect(result.validQuestions).toHaveLength(0);
  });

  test('accepts valid matching question', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 7,
        topic: 'İslam Tarihi',
        difficulty: 'orta',
        type: 'matching',
        question: 'Kavramları tanımlarıyla eşleştirin.',
        pairs: [
          { term: 'Hicret', definition: 'Hz. Muhammed\'in Mekke\'den Medine\'ye göçü' },
          { term: 'Bedir Savaşı', definition: '624 yılında yapılan ilk büyük savaş' },
          { term: 'Hudeybiye Anlaşması', definition: '628 yılında yapılan barış anlaşması' }
        ]
      }
    ]);

    expect(result.errors).toHaveLength(0);
    expect(result.validQuestions).toHaveLength(1);
    expect(result.validQuestions[0]).toMatchObject({ type: 'matching', pairs: expect.any(Array) });
  });
});
