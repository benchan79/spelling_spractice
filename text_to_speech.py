import os
import sys
import json
from gtts import gTTS
import pandas as pd
from tqdm import tqdm

def load_config(config_file: str) -> dict:
    """
    Load configuration from a JSON file.

    Args:
        config_file (str): Path to the configuration file.

    Returns:
        dict: Configuration dictionary.
    """
    with open(config_file, 'r') as f:
        config = json.load(f)
    return config

def generate_pause_binary() -> bytes:
    """
    Generate binary data for pause audio.

    Returns:
        bytes: Binary data for pause audio.
    """
    pause = gTTS("¤", lang="fr")
    with open("pause.mp3", "wb") as f:
        pause.write_to_fp(f)

    with open("pause.mp3", "rb") as f:
        pause_binary = f.read()
    return pause_binary


def generate_audio_files(
    input_file: str, output_directory: str, languange: str
) -> None:
    """
    Generate audio files from input CSV file.

    Args:
        input_file (str): Path to the input CSV file.
        output_directory (str): Directory to save the generated audio files.
        language (str): Language used in the input CSV file.
    """
    df = pd.read_csv(input_file, sep=":", header=None)
    pause_binary = generate_pause_binary()
    list_word_num_dict = config["word_count_to_list_dict"]

    start = 0
    end = 0

    with tqdm(total=df.shape[0], desc="Generating audio files") as pbar:
        for list_num in list_word_num_dict:
            end += list_word_num_dict[list_num]
            df_sub = df.iloc[start:end]
            for word_num, word in enumerate(df_sub.values):
                list_num_str = str(list_num + 1).zfill(2)
                word_num_str = str(word_num + 1).zfill(2)
                sound_file = os.path.join(
                    output_directory, f"{list_num_str}_{word_num_str}.mp3"
                )
                with open(sound_file, "wb") as f:
                    gTTS(word[0], lang=languange, slow=True).write_to_fp(f)
                    f.write(pause_binary * 3)
                    gTTS(word[1], lang=languange).write_to_fp(f)
                    f.write(pause_binary * 1)

                pbar.update(1)
            start = end


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(
            "Usage: python text_to_speech.py <input_csv_file> <output_directory> <language>"
        )
        print(
            "Example: python text_to_speech.py data/qtps_chi_p2/sentences.csv data/qtps_chi_p2_test/ zh-CN"
        )
        sys.exit(1)

    input_file_path = sys.argv[1]
    output_directory_path = sys.argv[2]
    text_language = sys.argv[3]

    if not os.path.exists(input_file_path):
        print(f"Error: Input CSV file '{input_file_path}' not found.")
        sys.exit(1)

    if text_language not in ["en", "zh-CN"]:
        print(f"Error: Use en for English and zh-CN for Chinese.")
        sys.exit(1)

    if not os.path.exists(output_directory_path):
        os.makedirs(output_directory_path)

    config = load_config("config.json")

    generate_audio_files(input_file_path, output_directory_path, text_language)
