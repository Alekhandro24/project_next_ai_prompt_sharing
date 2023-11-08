"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: sessions } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${sessions?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (sessions?.user.id) fetchPosts();
  }, [sessions?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Profile
        name="My"
        descr="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
