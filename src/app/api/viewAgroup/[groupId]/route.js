// app/api/viewAgroup/[groupId]/route.js
import { showGroups, getGroupListsAndTasks } from '@/app/lib/db/showData';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  console.log("API route GET function started"); // ADD THIS
  const groupId = params.groupId;
  console.log("API received groupId:", groupId); // ADD THIS

  if (groupId) {
    try {
      console.log("API calling getGroupListsAndTasks with:", groupId); // ADD THIS
      const groupData = await getGroupListsAndTasks(parseInt(groupId, 10));
      console.log("API getGroupListsAndTasks result:", groupData); // ADD THIS
      return NextResponse.json(groupData);
    } catch (error) {
      console.error("API error in getGroupListsAndTasks:", error); 
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Please provide a groupId in the URL' }, { status: 400 });
  }
}