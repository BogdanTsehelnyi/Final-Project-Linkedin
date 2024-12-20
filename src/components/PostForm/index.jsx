import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
import styles from "./PostForm.module.scss"; // Імпорт стилів

const PostForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const initialValues = {
    title: "",
    content: "",
    photoUrl: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
      //   onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => (
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
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("photoUrl", file);
                    if (file) {
                      setPhotoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              {touched.photoUrl && errors.photoUrl && (
                <div className={styles.errorMessage}>{errors.photoUrl}</div>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
