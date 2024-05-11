A mini project to help kids practise their spelling and 听写 independently.

Steps and tools used.

1. Scan or take a photograph of the spelling list.
2. Use pytesseract as an OCR tool to extract the words in the image.
3. Use ChatGPT to generate a sentence for each word before saving the word-sentence pairs in a csv file.
4. Use gTTS to convert the text to audio before saving as mp3 files.
5. Build a simple static webpage with links to the audio files.
6. Use basic javascript to control how the audio files are played.

Future improvement include:
1. Using Flask to convert the text to speech in real time.
2. Using OpenAI API to generate sentences.
3. Allow user to submit a list of new words.