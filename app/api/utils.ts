interface SanitizeProps {
  [key: string]: any;
}

export const DELETE_ROLES = ["super", "admin"];

export const sanitizeOutput = <T extends SanitizeProps>(
  data: T | T[],
  fieldsToExclude: SanitizeProps
) => {
  const sanitizeObject = (obj: T, fields: string[]) => {
    const sanitizedObj = { ...obj };
    for (const field of fields) {
      delete sanitizedObj[field];
    }
    return sanitizedObj;
  };

  const fields = Object.keys(fieldsToExclude);

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeObject(item, fields)) as T[];
  } else {
    return sanitizeObject(data, fields);
  }
};
