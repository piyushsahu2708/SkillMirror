'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/flag-suspicious-scoring.ts';
import '@/ai/flows/generate-performance-feedback.ts';
import '@/ai/flows/analyze-resume.ts';
