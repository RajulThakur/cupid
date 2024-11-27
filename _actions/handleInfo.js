'use server';

import {AddInfo} from '@/app/_lib/data-service';
import {InfoSchema} from '@/app/_lib/zod';
import {headers} from 'next/headers';

export default async function handleInfo(formData) {
  //GET URL OF PREVIOUS PAGE AND THEN ID FROM IT
  const headersList = headers();
  const referer = headersList.get('referer');
  const url = new URL(referer);
  const id = url?.searchParams.get('id');
  const {firstName, lastName, gender, relationship, bio} = formData;
  //GETTING FORM DATA
  const {
    firstName: formFirstName,
    lastName: formLastName,
    gender: Gender,
    relationship: relationshipStatus,
    bio: Bio,
  } = await InfoSchema.parseAsync({
    firstName,
    lastName,
    gender,
    relationship,
    bio,
  });
  await AddInfo(id, {
    firstName: formFirstName,
    lastName: formLastName,
    gender: Gender,
    relationshipStatus,
    bio: Bio,
    isCompleted: true,
  });
}
