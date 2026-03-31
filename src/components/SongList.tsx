import { promises as fs } from "fs";
import path from "path";

export default async function SongList() {
  const publicDir = path.join(process.cwd(), "public");
  let files: string[] = [];

  try {
    const entries = await fs.readdir(publicDir, { withFileTypes: true });
    files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => /\.(wav|mp3|ogg|m4a)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  } catch (error) {
    console.error("Unable to read public directory for song list", error);
  }

  if (!files.length) {
    return <p>No songs found in public/ yet.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5">
        {files.map((file) => {
          const url = `/LiveifyWeb/${encodeURI(file)}`;
          return (
            <li key={file}>
              <p className="font-medium">{file}</p>
              <audio controls className="w-full" src={url} preload="none">
                Your browser does not support the audio element.
              </audio>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
