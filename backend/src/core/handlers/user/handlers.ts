import { Request, Response } from "express";
import { firestore as db } from "../../infrastructure/firebase";
import { ERROR_CODES, ERROR_MESSAGES } from "../../../../../shared/utils/codes";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({
        errorCode: ERROR_CODES.VALIDATION_ERROR,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
      });
      return;
    }

    const userRef = db.collection("users").doc();
    await userRef.set({ id: userRef.id, name, email });

    res.status(201).json({
      success: true,
      message: "User successfully created.",
      data: { id: userRef.id, name, email },
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.CREATE_USER_ERROR,
      message: ERROR_MESSAGES.CREATE_USER_ERROR,
      details: error.message,
    });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await db.collection("users").get();

    if (snapshot.empty) {
      res.status(404).json({
        errorCode: ERROR_CODES.GET_USERS_ERROR,
        message: ERROR_MESSAGES.NO_USERS_FOUND,
      });
      return;
    }

    const users = snapshot.docs.map((doc) => doc.data());
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.GET_USERS_ERROR,
      message: ERROR_MESSAGES.GET_USERS_ERROR,
      details: error.message,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_USER_ID,
        message: ERROR_MESSAGES.MISSING_USER_ID,
      });
      return;
    }

    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res.status(404).json({
        errorCode: ERROR_CODES.USER_NOT_FOUND,
        message: ERROR_MESSAGES.USER_NOT_FOUND(id),
      });
      return;
    }

    await userRef.update({ name, email });
    res.status(200).json({
      success: true,
      message: "User successfully updated.",
      data: { id, name, email },
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.UPDATE_USER_ERROR,
      message: ERROR_MESSAGES.UPDATE_USER_ERROR,
      details: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_USER_ID,
        message: ERROR_MESSAGES.MISSING_USER_ID,
      });
      return;
    }

    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res.status(404).json({
        errorCode: ERROR_CODES.USER_NOT_FOUND,
        message: ERROR_MESSAGES.USER_NOT_FOUND(id),
      });
      return;
    }

    await userRef.delete();
    res.status(200).json({
      success: true,
      message: "User successfully deleted.",
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.DELETE_USER_ERROR,
      message: ERROR_MESSAGES.DELETE_USER_ERROR,
      details: error.message,
    });
  }
};
