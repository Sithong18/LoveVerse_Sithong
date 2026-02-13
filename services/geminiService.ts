
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveLetter = async (params: {
  sender: string;
  recipient: string;
  tone: 'Romantic' | 'Funny' | 'Poetic' | 'Short' | 'Long Distance';
  details: string;
}) => {
  const prompt = `Write a ${params.tone} love letter from ${params.sender} to ${params.recipient} in the LAO LANGUAGE. 
  Include these details: ${params.details}. 
  The letter should feel heartfelt, personal, and use beautiful Lao vocabulary. 
  Respond ONLY with the letter content.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating love letter:", error);
    return "ຄວາມຮັກຄືຄວາມອົດທົນ, ຄວາມຮັກຄືຄວາມເມດຕາ... ແຕ່ຕອນນີ້ AI ຂອງພວກເຮົາກຳລັງຕື່ນເຕັ້ນເກີນໄປ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ!";
  }
};

export const getLoveAdvice = async (names: string[]) => {
  const prompt = `Give a romantic, slightly funny piece of relationship advice for a couple named ${names[0]} and ${names[1]} in the LAO LANGUAGE. Keep it under 50 words.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "ການສື່ສານເປັນສິ່ງສຳຄັນ, ແຕ່ຊັອກໂກແລັດກໍ່ຊ່ວຍໄດ້ຄືກັນ!";
  }
};
