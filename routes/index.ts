import express from "express";
import { getCommits } from '../controllers';
export const router = express.Router();

router.get("/commits/:service/:pullRequestId", getCommits);
