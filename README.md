# L1 vs L2 Emotional Processing Experiment

A psycholinguistic and cognitive neuroscience experiment designed to investigate emotional blunting in bilingual individuals.

## Overview
This web-based behavioral experiment tests the hypothesis that bilingual individuals process and describe emotional stimuli differently in their first language (L1) compared to their second language (L2 - English). The experiment measures both quantitative emotional intensity ratings and qualitative linguistic expression.

## Experimental Design
- **Software**: Programmed using the [jsPsych](https://www.jspsych.org/) behavioral library (v7.3).
- **Design**: Within-subjects, blocked design (L1 vs L2).
- **Stimuli**: 24 images drawn from the Open Affective Standardized Image Set (OASIS). The stimuli are strictly categorized into positive and negative valence to ensure balanced blocks across both language conditions.
- **Counterbalancing**: Block order is counterbalanced based on participant ID (even IDs receive L1 first, odd IDs receive L2 first).
- **Duration**: Approximately 15-20 minutes.

## Running the Experiment Locally
Because this experiment is built with pure HTML, CSS, and Vanilla JavaScript, there is no build step required.
1. Clone the repository.
2. Open `index.html` in any modern web browser.

## Data Collection
Upon completion of the experiment, a CSV file containing the participant's trial-by-trial ratings and free-text descriptions is automatically downloaded to the host machine.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
*Note: Stimuli sourced from the OASIS database belong to their respective creators (Kurdi, Newman, & Seelig, 2017) and are intended for non-commercial academic research.*
