
export enum View {
  LANDING = 'LANDING',
  CALCULATOR = 'CALCULATOR',
  GENERATOR = 'GENERATOR',
  TIMELINE = 'TIMELINE',
  COUNTDOWN = 'COUNTDOWN',
  SURPRISE = 'SURPRISE',
  QR = 'QR',
  PORTFOLIO = 'PORTFOLIO',
  DASHBOARD = 'DASHBOARD'
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export interface Surprise {
  id: string;
  message: string;
  password?: string;
  sender: string;
  recipient: string;
}

export interface CoupleProfile {
  partner1: string;
  partner2: string;
  anniversary: string;
  story: string;
  memories: Memory[];
}
