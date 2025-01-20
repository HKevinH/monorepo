import { Request, Response } from "express";
import { firestore as db } from "../../infrastructure/firebase";
import { ERROR_CODES, ERROR_MESSAGES } from "../../../../../shared/utils/codes";
import type { IPurchase } from "../../../../../shared/models/purchase.model";

export const createPurchase = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, totalAmount, date, details, iduser }: IPurchase = req.body;

    if (!title || totalAmount == null || !date || !details || !iduser) {
      res.status(400).json({
        errorCode: ERROR_CODES.VALIDATION_ERROR,
        message: "Title, totalAmount, date, and details are required.",
      });
      return;
    }

    const purchaseRef = db.collection("purchases").doc();
    await purchaseRef.set({
      id: purchaseRef.id,
      userId: iduser,
      title,
      totalAmount,
      date,
      details,
    });

    res.status(201).json({
      success: true,
      message: "Purchase successfully created.",
      data: { id: purchaseRef.id, title, totalAmount, date, details },
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.CREATE_PURCHASE_ERROR,
      message: ERROR_MESSAGES.CREATE_PURCHASE_ERROR,
      details: error.message,
    });
  }
};

export const getPurchases = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const snapshot = await db.collection("purchases").get();

    if (snapshot.empty) {
      res.status(404).json({
        errorCode: ERROR_CODES.GET_PURCHASES_ERROR,
        message: ERROR_MESSAGES.NO_PURCHASES_FOUND,
      });
      return;
    }

    const purchases = snapshot.docs.map((doc) => doc.data());
    res.status(200).json({
      success: true,
      message: "Purchases retrieved successfully.",
      data: purchases,
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.GET_PURCHASES_ERROR,
      message: ERROR_MESSAGES.GET_PURCHASES_ERROR,
      details: error.message,
    });
  }
};

export const updatePurchase = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, totalAmount, date, details }: Partial<IPurchase> = req.body;

    if (!id) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_PURCHASE_ID,
        message: ERROR_MESSAGES.MISSING_PURCHASE_ID,
      });
      return;
    }

    const purchaseRef = db.collection("purchases").doc(id);
    const purchaseDoc = await purchaseRef.get();

    if (!purchaseDoc.exists) {
      res.status(404).json({
        errorCode: ERROR_CODES.PURCHASE_NOT_FOUND,
        message: ERROR_MESSAGES.PURCHASE_NOT_FOUND(id),
      });
      return;
    }

    await purchaseRef.update({ title, totalAmount, date, details });
    res.status(200).json({
      success: true,
      message: "Purchase successfully updated.",
      data: { id, title, totalAmount, date, details },
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.UPDATE_PURCHASE_ERROR,
      message: ERROR_MESSAGES.UPDATE_PURCHASE_ERROR,
      details: error.message,
    });
  }
};

export const deletePurchase = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_PURCHASE_ID,
        message: ERROR_MESSAGES.MISSING_PURCHASE_ID,
      });
      return;
    }

    const purchaseRef = db.collection("purchases").doc(id);
    const purchaseDoc = await purchaseRef.get();

    if (!purchaseDoc.exists) {
      res.status(404).json({
        errorCode: ERROR_CODES.PURCHASE_NOT_FOUND,
        message: ERROR_MESSAGES.PURCHASE_NOT_FOUND(id),
      });
      return;
    }

    await purchaseRef.delete();
    res.status(200).json({
      success: true,
      message: "Purchase successfully deleted.",
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.DELETE_PURCHASE_ERROR,
      message: ERROR_MESSAGES.DELETE_PURCHASE_ERROR,
      details: error.message,
    });
  }
};

export const getPurchasesByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_USER_ID,
        message: "User ID is required.",
      });
      return;
    }

    const snapshot = await db
      .collection("purchases")
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      res.status(404).json({
        errorCode: ERROR_CODES.NO_PURCHASES_FOUND,
        message: `No purchases found for user ID: ${userId}`,
      });
      return;
    }

    const purchases = snapshot.docs.map((doc) => doc.data());
    res.status(200).json({
      success: true,
      message: "Purchases retrieved successfully.",
      data: purchases,
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.GET_PURCHASES_ERROR,
      message: ERROR_MESSAGES.GET_PURCHASES_ERROR,
      details: error.message,
    });
  }
};
