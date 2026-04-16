// Translation Dictionary
const i18n = {
  en: {
    instruction: "You will see a series of images. For each image, please rate how emotionally intense it is and provide a short description of how it made you feel.",
    continue: "Continue",
    fixation: "+",
    likert_prompt: "How emotionally intense is this image?",
    likert_labels: ["1\nNot at all", "2", "3", "4", "5", "6", "7\nExtremely"],
    text_prompt: "Describe how this image made you feel.",
    block_start: "We will now begin the block in: English.",
    end: "Experiment complete. Thank you for participating. Downloading data...",
    lang_name: "English"
  },
  it: {
    instruction: "Vedrai una serie di immagini. Per ogni immagine, valuta quanto è emotivamente intensa e fornisci una breve descrizione di come ti ha fatto sentire.",
    continue: "Continua",
    fixation: "+",
    likert_prompt: "Quanto è emotivamente intensa questa immagine?",
    likert_labels: ["1\nPer niente", "2", "3", "4", "5", "6", "7\nEstremamente"],
    text_prompt: "Descrivi come ti ha fatto sentire questa immagine.",
    block_start: "Inizieremo ora il blocco in: Italiano.",
    end: "Esperimento completato. Grazie per aver partecipato. Download dei dati in corso...",
    lang_name: "Italiano"
  },
  tr: {
    instruction: "Bir dizi resim göreceksiniz. Lütfen her bir resmin ne kadar duygusal olarak yoğun olduğunu değerlendirin ve size ne hissettirdiğini kısaca açıklayın.",
    continue: "Devam et",
    fixation: "+",
    likert_prompt: "Bu görüntü duygusal olarak ne kadar yoğun?",
    likert_labels: ["1\nHiç", "2", "3", "4", "5", "6", "7\nAşırı"],
    text_prompt: "Bu görüntünün size ne hissettirdiğini açıklayın.",
    block_start: "Şimdi şu dildeki bloğa başlayacağız: Türkçe.",
    end: "Deney tamamlandı. Katıldığınız için teşekkürler. Veriler indiriliyor...",
    lang_name: "Türkçe"
  },
  ru: {
    instruction: "Вы увидите ряд изображений. Для каждого изображения оцените, насколько оно эмоционально насыщено, и кратко опишите, что вы почувствовали.",
    continue: "Продолжить",
    fixation: "+",
    likert_prompt: "Насколько эмоционально насыщено это изображение?",
    likert_labels: ["1\nСовсем нет", "2", "3", "4", "5", "6", "7\nОчень сильно"],
    text_prompt: "Опишите, что вы почувствовали, глядя на это изображение.",
    block_start: "Сейчас начнется блок на языке: Русский.",
    end: "Эксперимент завершен. Спасибо за участие. Загрузка данных...",
    lang_name: "Русский"
  },
  nl: {
    instruction: "Je krijgt een reeks afbeeldingen te zien. Beoordeel voor elke afbeelding hoe emotioneel intens deze is en geef een korte beschrijving van hoe je je erbij voelde.",
    continue: "Doorgaan",
    fixation: "+",
    likert_prompt: "Hoe emotioneel intens is deze afbeelding?",
    likert_labels: ["1\nHelemaal niet", "2", "3", "4", "5", "6", "7\nExtreem"],
    text_prompt: "Beschrijf hoe deze afbeelding je liet voelen.",
    block_start: "We beginnen nu met het blok in: Nederlands.",
    end: "Experiment voltooid. Bedankt voor uw deelname. Gegevens worden gedownload...",
    lang_name: "Nederlands"
  }
};

// Picturesets
const pictureset1 = [
  "pictureset1/Alcohol 4.jpg",
  "pictureset1/Animal carcass 1.jpg",
  "pictureset1/Baby 5.jpg",
  "pictureset1/Dog 6.jpg",
  "pictureset1/Police 2.jpg",
  "pictureset1/Snake 1.jpg"
];
const pictureset2 = [
  "pictureset2/Animal carcass 3.jpg",
  "pictureset2/Baby 6.jpg",
  "pictureset2/Dog 4.jpg",
  "pictureset2/Police 5.jpg",
  "pictureset2/Snake 4.jpg",
  "pictureset2/Toast 1.jpg"
];
const stimuliImages = [...pictureset1, ...pictureset2];

// Utility to shuffle arrays (Fisher-Yates)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Form validation and experiment startup
document.getElementById('demographics-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const l1 = document.getElementById('l1').value;
  const l2 = 'en';
  const participantId = document.getElementById('participant_id').value;

  // Collect Data
  const participantData = {
    participant_id: participantId,
    l1: l1,
    l2: l2,
    l2_proficiency: document.getElementById('l2_proficiency').value,
    age_of_acquisition: document.getElementById('age_of_acquisition').value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value
  };

  // Hide startup form, show JS psych target
  document.getElementById('startup-container').style.display = 'none';
  document.getElementById('jspsych-target').style.display = 'flex';

  // Build and run the jsPsych logic
  runExperiment(participantData);
});

function runExperiment(data) {
  const jsPsych = initJsPsych({
    display_element: 'jspsych-target',
    on_finish: function() {
      // Clean data for standard analysis by keeping only the relevant trials and columns
      const dataToExport = jsPsych.data.get().filter({task: 'emotion_rating'});
      dataToExport.localSave('csv', `Participant${data.participant_id}.csv`);
    }
  });

  // Add properties to all data rows
  jsPsych.data.addProperties({
    participant_id: data.participant_id,
    l1: data.l1,
    l2: data.l2,
    l2_proficiency: data.l2_proficiency,
    age_of_acquisition: data.age_of_acquisition,
    age: data.age,
    gender: data.gender,
  });

  const timeline = [];

  // Enter fullscreen
  timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: true
  });

  // Preload Images
  timeline.push({
    type: jsPsychPreload,
    images: stimuliImages
  });

  // Counterbalancing: Decide if L1 or L2 goes first based on Participant ID
  // Even IDs = L1 first, Odd IDs = L2 first
  const participantNumber = parseInt(data.participant_id, 10);
  const l1_first = !isNaN(participantNumber) ? (participantNumber % 2 === 0) : (Math.random() < 0.5);
  
  // Counterbalancing: Decide which pictureset goes to L1 and L2
  // Participants 1, 2 get set1 for L1; Participants 3, 4 get set2 for L1, etc.
  const set1_for_l1 = !isNaN(participantNumber) ? (Math.floor((participantNumber - 1) / 2) % 2 === 0) : (Math.random() < 0.5);
  
  jsPsych.data.addProperties({ 
    l1_first: l1_first,
    set1_for_l1: set1_for_l1
  });

  // Randomize the order of pictures within each pictureset
  const shuffledSet1 = shuffle([...pictureset1]);
  const shuffledSet2 = shuffle([...pictureset2]);
  
  // Assign picturesets to L1 and L2 based on the counterbalance condition
  const l1_images = set1_for_l1 ? shuffledSet1 : shuffledSet2;
  const l2_images = set1_for_l1 ? shuffledSet2 : shuffledSet1;

  // Determine the order in which blocks (L1/L2) are presented
  const blockOrder = l1_first ? [data.l1, data.l2] : [data.l2, data.l1];
  const imageBlocks = l1_first ? [l1_images, l2_images] : [l2_images, l1_images];
  const typeBlocks = l1_first ? ['L1', 'L2'] : ['L2', 'L1'];

  blockOrder.forEach((langKey, blockIndex) => {
    const t = i18n[langKey];
    const images = imageBlocks[blockIndex];
    const blockType = typeBlocks[blockIndex];

    // Block Start Message
    timeline.push({
      type: jsPsychHtmlButtonResponse,
      stimulus: `<h2>${t.block_start}</h2><p>${t.instruction}</p>`,
      choices: [t.continue]
    });

    // Trials
    images.forEach(imgUrl => {
      // Fixation
      timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="height: 400px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;"><div class="fixation-cross">${t.fixation}</div></div>`,
        choices: "NO_KEYS",
        trial_duration: 500
      });

      // HTML Form Trial combining Image + Likert + Text
      const formHtml = `
        <div style="height: 400px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;" class="mb-4 text-center">
          <img src="${imgUrl}" class="stimulus-image" style="max-height: 100%; object-fit: contain;" />
        </div>
        <div class="mb-6">
          <label style="font-weight: 600; font-size: 18px; margin-bottom: 12px; display: block; text-align: center;">${t.likert_prompt}</label>
          <div class="likert-container">
            ${t.likert_labels.map((lb, i) => `
              <label class="likert-option">
                <input type="radio" name="intensity" value="${i+1}" required />
                <span class="likert-label" style="white-space: pre-wrap;">${lb}</span>
              </label>
            `).join('')}
          </div>
        </div>
        <div class="mb-6">
          <label style="font-weight: 600; display: block; margin-bottom: 8px;">${t.text_prompt}</label>
          <textarea name="description" required placeholder="..." style="width: 100%; min-height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; font-size: 16px; box-sizing: border-box; resize: vertical;"></textarea>
        </div>
      `;

      timeline.push({
        type: jsPsychSurveyHtmlForm,
        html: formHtml,
        button_label: t.continue,
        data: {
          task: 'emotion_rating',
          block_language: langKey,
          language_type: blockType,
          stimulus: imgUrl
        },
        on_finish: function(data) {
          // Unnest JSON responses into discrete columns for statistical software
          if (data.response) {
            data.intensity_score = data.response.intensity;
            data.text_description = data.response.description;
          }
        }
      });
    });
  });

  // End Screen
  timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h2>Experiment Complete</h2><p>Thank you for participating. Your data is being downloaded.</p>`,
    trial_duration: 3000
  });

  // Exit fullscreen
  timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: false
  });

  jsPsych.run(timeline);
}
