import { z } from 'zod';

export const percentSchema = z.number().min(0).max(100);
export const perdecSchema = z.number().min(0).max(10);
export const byteSchema = z.number().min(0).max(255);
export const angleSchema = z.number().min(0).max(180);