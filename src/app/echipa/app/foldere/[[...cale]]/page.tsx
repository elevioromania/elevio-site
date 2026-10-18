import { redirect } from "next/navigation";

// Folderele se văd acum direct în „Lead-urile mele”.
export default function Page() {
  redirect("/echipa/app/leaduri");
}
