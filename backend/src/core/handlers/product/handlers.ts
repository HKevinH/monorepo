import { Request, Response } from "express";
import { firestore as db } from "../../infrastructure/firebase";
import { ERROR_CODES, ERROR_MESSAGES } from "../../../../../shared/utils/codes";
import { IProduct } from "../../../../../shared/models/product.model";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, quantity, unitPrice }: IProduct = req.body;

    if (!name || quantity == null || unitPrice == null) {
      res.status(400).json({
        errorCode: ERROR_CODES.VALIDATION_ERROR,
        message: "Name, quantity, and unitPrice are required.",
      });
      return;
    }

    const productRef = db.collection("products").doc();
    await productRef.set({ id: productRef.id, name, quantity, unitPrice });

    res.status(201).json({
      success: true,
      message: "Product successfully created.",
      data: { id: productRef.id, name, quantity, unitPrice },
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.CREATE_PRODUCT_ERROR,
      message: ERROR_MESSAGES.CREATE_PRODUCT_ERROR,
      details: error.message,
    });
  }
};

export const getProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const snapshot = await db.collection("products").get();

    if (snapshot.empty) {
      res.status(404).json({
        errorCode: ERROR_CODES.GET_PRODUCTS_ERROR,
        message: ERROR_MESSAGES.NO_PRODUCTS_FOUND,
      });
      return;
    }

    const products = snapshot.docs.map((doc) => doc.data());
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.GET_PRODUCTS_ERROR,
      message: ERROR_MESSAGES.GET_PRODUCTS_ERROR,
      details: error.message,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, quantity, unitPrice }: Partial<IProduct> = req.body;

    if (!id) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_PRODUCT_ID,
        message: ERROR_MESSAGES.MISSING_PRODUCT_ID,
      });
      return;
    }

    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      res.status(404).json({
        errorCode: ERROR_CODES.PRODUCT_NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCT_NOT_FOUND(id),
      });
      return;
    }

    await productRef.update({ name, quantity, unitPrice });
    res.status(200).json({
      success: true,
      message: "Product successfully updated.",
      data: { id, name, quantity, unitPrice },
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.UPDATE_PRODUCT_ERROR,
      message: ERROR_MESSAGES.UPDATE_PRODUCT_ERROR,
      details: error.message,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        errorCode: ERROR_CODES.MISSING_PRODUCT_ID,
        message: ERROR_MESSAGES.MISSING_PRODUCT_ID,
      });
      return;
    }

    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      res.status(404).json({
        errorCode: ERROR_CODES.PRODUCT_NOT_FOUND,
        message: ERROR_MESSAGES.PRODUCT_NOT_FOUND(id),
      });
      return;
    }

    await productRef.delete();
    res.status(200).json({
      success: true,
      message: "Product successfully deleted.",
    });
  } catch (error: any) {
    res.status(500).json({
      errorCode: ERROR_CODES.DELETE_PRODUCT_ERROR,
      message: ERROR_MESSAGES.DELETE_PRODUCT_ERROR,
      details: error.message,
    });
  }
};
