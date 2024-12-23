import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PostForm.module.scss";
import { uploadFile } from "../../utils/uploadFile";
import { createPost } from "../../redux/slices/postsSlice";

const PostForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const folderName = "contentPhoto";
  const initialValues = {
    authorId: userId,
    title: "",
    content: "",
    photoUrl: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Відправка даних на сервер
      await dispatch(createPost(values)).unwrap();
      console.log("Post created successfully:", values);

      // Очистка форми
      resetForm();
      setPhotoPreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          {/* Поле Title */}
          <div className={styles.formGroup}>
            <Field
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              className={`${styles.input} ${touched.title && errors.title ? styles.error : ""}`}
            />
            {touched.title && errors.title && (
              <div className={styles.errorMessage}>{errors.title}</div>
            )}
          </div>

          {/* Поле Content */}
          <div className={styles.formGroup}>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows="4"
              placeholder="Enter content"
              className={`${styles.textarea} ${
                touched.content && errors.content ? styles.error : ""
              }`}
            />
            {touched.content && errors.content && (
              <div className={styles.errorMessage}>{errors.content}</div>
            )}
          </div>

          {/* Попередній перегляд фото */}
          {photoPreview && (
            <div className={styles.photoPreview}>
              <img src={photoPreview} alt="Preview" className={styles.photo} />
            </div>
          )}
          <div className={styles.botContainer}>
            {/* Інпут для завантаження фото */}
            <div className={styles.iconContainer}>
              <label className={styles.photoUploadLabel}>
                <img
                  src="/image/publication/media.svg"
                  alt="Upload"
                  className={styles.photoUploadIcon}
                />
                <input
                  id="photoUrl"
                  name="photoUrl"
                  type="file"
                  accept="image/*"
                  className={styles.photoUploadInput}
                  onChange={async (event) => {
                    const fileImg = event.target.files[0];
                    if (fileImg) {
                      try {
                        const uploadedUrl = await uploadFile(fileImg, folderName);
                        setFieldValue("photoUrl", uploadedUrl);
                        setPhotoPreview(uploadedUrl);
                      } catch (error) {
                        console.error("Upload failed:", error);
                      }
                    }
                  }}
                />
              </label>
              {touched.photoUrl && errors.photoUrl && (
                <div className={styles.errorMessage}>{errors.photoUrl}</div>
              )}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
