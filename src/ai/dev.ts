'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/flag-suspicious-scoring.ts';
