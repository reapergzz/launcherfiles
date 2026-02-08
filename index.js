export default {
  async fetch(request, env, ctx) {
    const OBJECT_KEY = "launcher.exe"; // your file in R2
    const object = await env.FILES_BUCKET.get(OBJECT_KEY);
    if (!object) return new Response("File not found", { status: 404 });

    const headers = new Headers();
    headers.set("Content-Type", object.httpMetadata.contentType || "application/octet-stream");
    headers.set("Content-Disposition", `attachment; filename=${OBJECT_KEY}`);

    return new Response(object.body, { headers });
  }
};