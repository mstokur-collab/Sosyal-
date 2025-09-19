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

  test("rejects fill-in question without blank placeholder", () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 6,
        topic: 'Coğrafya',
        difficulty: 'orta',
        type: 'fill-in',
        sentence: 'Türkiye haritasındaki boşluğu doğru kelimeyle tamamlayın.',
        answer: 'Anadolu',
        distractors: ['Karadeniz']
      }
    ]);

    expect(result.errors).toContain("Soru 1: Cümle eksik veya '___' işareti yok.");
    expect(result.validQuestions).toHaveLength(0);
  });

  test('rejects fill-in question without distractors', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 6,
        topic: 'Coğrafya',
        difficulty: 'orta',
        type: 'fill-in',
        sentence: "Türkiye'nin başkenti ___ şehridir.",
        answer: 'Ankara',
        distractors: []
      }
    ]);

    expect(result.errors).toContain('Soru 1: En az 1 çeldirici gerekli.');
    expect(result.validQuestions).toHaveLength(0);
  });

  test('rejects matching question with insufficient pairs', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 7,
        topic: 'Tarih',
        difficulty: 'zor',
        type: 'matching',
        question: 'Kişileri eserleriyle eşleştirin.',
        pairs: [
          { term: 'Yunus Emre', definition: 'İlahi şairi' },
          { term: 'Karacaoğlan', definition: 'Halk ozanı' }
        ]
      }
    ]);

    expect(result.errors).toContain('Soru 1: En az 3 eşleştirme çifti gerekli.');
    expect(result.validQuestions).toHaveLength(0);
  });

  test('rejects matching question when a pair is incomplete', () => {
    const result = teacherPanelModule.validateQuestions([
      {
        grade: 7,
        topic: 'Tarih',
        difficulty: 'kolay',
        type: 'matching',
        question: 'Terimleri açıklamalarıyla eşleştirin.',
        pairs: [
          { term: 'Orhun Yazıtları', definition: 'Türk tarihinin ilk yazılı belgeleri' },
          { term: 'Bilge Kağan', definition: '' },
          { term: 'Tonyukuk', definition: 'Göktürk veziri' }
        ]
      }
    ]);

    expect(result.errors).toContain('Soru 1, Çift 2: Terim ve açıklama gerekli.');
    expect(result.validQuestions).toHaveLength(0);
  });
});
