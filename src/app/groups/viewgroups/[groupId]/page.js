"use client";
import Link from "next/link.js";
import Header from "../../../components/header.js";
import 'bootstrap/dist/css/bootstrap.css';
import '../../../globals.css';
import '../../../styles/viewgroups.css';
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

async function fetchGroupInfo(groupId) {
  console.log("Fetching group info for ID:", groupId);
  try {
    const response = await fetch(`/api/viewAgroup/${groupId}`);
    console.log("Fetch response:", response);
    if (!response.ok) {
      console.error("Fetch error:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch group info:", error);
    return null;
  }
}

export default function ViewGroup() {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    console.log("useEffect running. groupId:", groupId);
    async function loadGroupData() {
      if (groupId) {
        const data = await fetchGroupInfo(groupId);
        console.log("Data after fetch:", data);
        setGroupData(data);
        console.log("groupData state updated:", groupData);
      }
    }

    loadGroupData();
  }, [groupId]);

  if (!groupData) {
    return <div>Loading group information...</div>;
  }

  return (
    <div>
      <Header />
      <main>
        <br />
        <br />
        <div className="row">
          {Array.isArray(groupData) ? (
            groupData.map((item) => (
              <div className="card" key={item.GrpList_ID || item.GrpTask_ID || Math.random()}>
                <div className="card-body">
                  {item.GrpList_Name && (
                    <div className="card-title">
                      <h3>{item.GrpList_Name}</h3>
                    </div>
                  )}
                  {item.GrpTask_Name && (
                    <div className="card-value">
                      <p>{item.GrpTask_Name}</p>
                    </div>
                  )}
                  {item.GrpTask_Content && (
                    <div className="card-text">
                      <p>{item.GrpTask_Content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-body">
                {groupData && groupData.Group_Name && (
                  <div className="card-title">
                    <h3>{groupData.Group_Name}</h3>
                  </div>
                )}
                <div className="card-value">
                  tasklists
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}