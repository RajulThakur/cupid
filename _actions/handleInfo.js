"use server";

import { AddInfo } from "@/app/_lib/data-service";
import { InfoSchema } from "@/app/_lib/zod";
import { headers } from "next/headers";

export default async function handleInfo(formData) {
  //GET URL OF PREVIOUS PAGE AND THEN ID FROM IT
  const headersList = headers();
  const referer = headersList.get("referer");
  const url = new URL(referer);
  const id = url?.searchParams.get("id");

  //GETTING FORM DATA
  const formFirstName = formData.get("firstName");
  const formLastName = formData.get("lastName");
  const gender = formData.get("gender");
  const relationship = formData.get("relationshipStatus");
  const image = formData.get("image");
  const bio = formData.get("bio");
  const {
    formFirstName: firstName,
    formLastName: lastName,
    gender: Gender,
    relationship: relationshipStatus,
    bio: Bio,
  } = await InfoSchema.parseAsync({
    formFirstName,
    formLastName,
    gender,
    relationship,
    bio,
  });
  await AddInfo(id, {
    firstName,
    lastName,
    gender: Gender,
    relationshipStatus,
    bio: Bio,
  });
}
