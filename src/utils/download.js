const MIME_TYPES = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  csv: "text/csv;charset=utf-8",
  txt: "text/plain;charset=utf-8",
  zip: "application/zip",
};

function getArrayBuffer(data) {
  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }

  throw new Error("The server did not return binary file data.");
}

function readErrorMessage(data) {
  try {
    const buffer = getArrayBuffer(data);
    const text = new TextDecoder("utf-8").decode(new Uint8Array(buffer));
    const result = JSON.parse(text);
    return result.msg || result.error?.message || "Download failed.";
  } catch (error) {
    return "Download failed because the server returned an invalid file.";
  }
}

function hasZipSignature(buffer) {
  const bytes = new Uint8Array(buffer);
  return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b;
}

export function downloadArrayBufferResponse(response, baseName, fileType) {
  if (!response) {
    throw new Error("The download server did not respond.");
  }

  const normalizedType = String(fileType || "").replace(/^\./, "").toLowerCase();
  const contentType = String(response.headers?.["content-type"] || "").toLowerCase();
  const status = Number(response.status || 0);

  if (status >= 400 || contentType.includes("application/json")) {
    throw new Error(readErrorMessage(response.data));
  }

  const buffer = getArrayBuffer(response.data);
  if (buffer.byteLength === 0) {
    throw new Error("The downloaded file is empty.");
  }

  if ((normalizedType === "xlsx" || normalizedType === "zip") && !hasZipSignature(buffer)) {
    throw new Error(readErrorMessage(buffer));
  }

  const extension = normalizedType ? `.${normalizedType}` : "";
  const requestedName = String(baseName || "download");
  const fileName = extension && !requestedName.toLowerCase().endsWith(extension)
    ? `${requestedName}${extension}`
    : requestedName;
  const mimeType = MIME_TYPES[normalizedType] || contentType || "application/octet-stream";
  const blob = new Blob([buffer], { type: mimeType });
  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 0);

  return true;
}
