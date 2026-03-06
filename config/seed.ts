import { config } from "dotenv";
import db from "./db";
import {
  communities,
  communityMembers,
  conversations,
  conversationSummaries,
  learningGoals,
  matches,
  messages,
  users,
} from "./schema";

config({ path: ".env.local" });

//FREE USERS
const FREE_USERS = [
  {
    clerkId: "free_user_001",
    name: "Free User One",
    email: "aBk2Q@example.com",
    subscriptionTier: "free",
  },
  {
    clerkId: "free_user_002",
    name: "Free User Two",
    email: "BkS9o@example.com",
    subscriptionTier: "free",
  },
  {
    clerkId: "free_user_003",
    name: "Free User Three",
    email: "efc5y@example.com",
    subscriptionTier: "free",
  },
  {
    clerkId: "free_user_004",
    name: "Free User Four",
    email: "oSt8l@example.com",
    subscriptionTier: "free",
  },
  {
    clerkId: "free_user_005",
    name: "Free User Five",
    email: "3Wvgk@example.com",
    subscriptionTier: "free",
  },
  {
    clerkId: "free_user_006",
    name: "Free User Six",
    email: "tiu1sk@example.com",
    subscriptionTier: "free",
  },
];

//PRO USERS
const PRO_USERS = [
  {
    clerkId: "pro_user_001",
    name: "John Doe (Pro)",
    email: "hkDr4@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_002",
    name: "Marcus Gabbe (Pro)",
    email: "BswQ1@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_003",
    name: "Mark Kim (Pro)",
    email: "vDmi6@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_004",
    name: "Susan Bradford (Pro)",
    email: "fe5tg@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_005",
    name: "Ema Scott (Pro)",
    email: "gkl9p@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_006",
    name: "Charles Hill (Pro)",
    email: "MmTp5@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_007",
    name: "Jane Doe (Pro)",
    email: "jaDo3@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_008",
    name: "Jamie Lannister (Pro)",
    email: "lan9i@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_009",
    name: "Esther Paul (Pro)",
    email: "esth4@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_010",
    name: "Samson Lannister (Pro)",
    email: "sam10@example.com",
    subscriptionTier: "pro",
  },
  {
    clerkId: "pro_user_011",
    name: "Jason Michael (Pro)",
    email: "jam3h@example.com",
    subscriptionTier: "pro",
  },
];

//Diverse communities
const COMMUNITIES_DATA = [
  {
    name: "Modern Full stack Next.js course",
    description:
      "Learn full stack development with Next.js, Typescript and modern tools",
  },
  {
    name: "CodedLibra Youtube community",
    description: "Community for CodedLibra youtube channel followers",
  },
  {
    name: "AI & Machine Learning",
    description: "Deep learning, NLP and practical AI applications community",
  },
  {
    name: "Cloud Native Computing",
    description: "AWS, GCP, Kubernetes, Docker, and more",
  },
  {
    name: "Python for Data Science",
    description:
      "Master Python, Numpy, Pandas for Data Science and Machine Learning",
  },
  {
    name: "React Native for beginners",
    description:
      "Learn Cross-platform Mobile development with React Native for beginners",
  },
];

//Learning Goals by Community
const LEARNING_GOALS_DATA = {
  "Modern Full stack Next.js course": [
    {
      title: "Next.js App router & Server components",
      description: "Master Next.js 14+ App router and React Server components",
    },
    {
      title: "Tailwind CSS",
      description: "Master Tailwind CSS",
    },
    {
      title: "Database integration with Drizzle ORM",
      description:
        "Build a type-safe database schema and queries with Drizzle ORM",
    },
    {
      title: "Authentication with Clerk",
      description:
        "Learn how to use Clerk for authentication and authorization",
    },
    {
      title: "Typescript best practices",
      description:
        "Learn the best practices for Typescript development and how to use it effectively",
    },
    {
      title: "Deployment & CI/CD",
      description:
        "Learn how to deploy your app to Vercel and how to set up CI/CD pipelines",
    },
  ],
  "CodedLibra Youtube community": [
    {
      title: "Technical interview prep",
      description: "Learn how to prepare for technical interviews",
    },
    {
      title: "Coding reviews best practices",
      description:
        "Learn how to conduct effective coding reviews that improves team quality",
    },
    {
      title: "Content Creation Tips",
      description:
        "Learn how to create engaging and effective content for your audience",
    },
  ],
  "AI & Machine Learning": [
    {
      title: "Deep learning",
      description: "Learn how to build and train deep learning models",
    },
    {
      title: "NLP",
      description: "Learn how to build and train NLP models",
    },
    {
      title: "Practical AI applications",
      description: "Learn how to build and deploy practical AI applications",
    },
  ],
  "Cloud Native Computing": [
    {
      title: "AWS",
      description: "Learn how to use AWS services",
    },
    {
      title: "GCP",
      description: "Learn how to use GCP services",
    },
    {
      title: "Kubernetes",
      description: "Learn how to use Kubernetes",
    },
    {
      title: "Docker",
      description: "Learn how to use Docker",
    },
  ],
  "Python for Data Science": [
    {
      title: "Introduction to Python",
      description: "Introduction to Python Programming",
    },
    {
      title: "Numpy",
      description: "Learn how to use Numpy",
    },
    {
      title: "Pandas",
      description: "Learn how to use Pandas",
    },
  ],
  "React Native for beginners": [
    {
      title: "React Native",
      description: "Learn how to use React Native",
    },
    {
      title: "Expo",
      description: "Learn how to use Expo",
    },
    {
      title: "Mobile App Deployment",
      description:
        "Learn how to deploy your mobile app on Google Play and App Store",
    },
  ],
};

//FREE USERS ASSIGNMENTS 1 community to 1 goal each
const FREE_USERS_ASSIGNMENTS = {
  "Free User One": {
    community: "Modern Full stack Next.js course",
    goal: "Next.js App router & Server components",
  },
  "Free User Two": {
    community: "CodedLibra Youtube community",
    goal: "Technical interview prep",
  },
  "Free User Three": {
    community: "AI & Machine Learning",
    goal: "Deep learning",
  },
  "Free User Four": {
    community: "Cloud Native Computing",
    goal: "AWS",
  },
  "Free User Five": {
    community: "Python for Data Science",
    goal: "Introduction to Python",
  },
  "Free User Six": {
    community: "React Native for beginners",
    goal: "React Native",
  },
};

//PRO USERS ASSIGNMENTS unlimited communities to unlimited goals each
const PRO_USERS_COMMUNITIES_ASSIGNMENTS = {
  "Charles Hill (Pro)": [
    "CodedLibra Youtube community",
    "AI & Machine Learning",
  ],
  "Jane Doe (Pro)": ["CodedLibra Youtube community"],
  "Ema Scott (Pro)": [
    "Modern Full stack Next.js course",
    "React Native for beginners",
  ],
  "Susan Bradford (Pro)": ["AI & Machine Learning", "Cloud Native Computing"],
  "Esther Paul (Pro)": ["Cloud Native Computing", "Python for Data Science"],
  "Mark Kim (Pro)": ["Cloud Native Computing", "AI & Machine Learning"],
  "Jason Michael (Pro)": [
    "Cloud Native Computing",
    "React Native for beginners",
  ],
  "Marcus Gabbe (Pro)": [
    "Python for Data Science",
    "Modern Full stack Next.js course",
  ],
  "John Doe (Pro)": ["React Native for beginners", "Python for Data Science"],
  "Samson Lannister (Pro)": [
    "Cloud Native Computing",
    "Python for Data Science",
  ],
};

const PRO_USERS_GOALSASSIGNMENTS = {
  "Charles Hill (Pro)": {
    "CodedLibra Youtube community": [
      "Technical interview prep",
      "Coding reviews best practices",
      "Content Creation Tips",
    ],
    "AI & Machine Learning": [
      "Deep learning",
      "NLP",
      "Practical AI applications",
    ],
  },
  "Jane Doe (Pro)": {
    "CodedLibra Youtube community": [
      "Technical interview prep",
      "Coding reviews best practices",
      "Content Creation Tips",
    ],
    "Python for Data Science": ["Introduction to Python", "Numpy", "Pandas"],
  },
  "Ema Scott (Pro)": {
    "Modern Full stack Next.js course": [
      "Next.js App router & Server components",
      "Tailwind CSS",
      "Database integration with Drizzle ORM",
      "Authentication with Clerk",
      "Typescript best practices",
      "Deployment & CI/CD",
    ],
    "React Native for beginners": [
      "React Native",
      "Expo",
      "Mobile App Deployment",
    ],
  },
  "Susan Bradford (Pro)": {
    "AI & Machine Learning": [
      "Deep learning",
      "NLP",
      "Practical AI applications",
    ],
    "Modern Full stack Next.js course": [
      "Next.js App router & Server components",
      "Tailwind CSS",
      "Database integration with Drizzle ORM",
      "Authentication with Clerk",
      "Typescript best practices",
      "Deployment & CI/CD",
    ],
  },
  "Esther Paul (Pro)": {
    "AI & Machine Learning": [
      "Deep learning",
      "NLP",
      "Practical AI applications",
    ],
  },
  "Mark Kim (Pro)": {
    "Cloud Native Computing": ["AWS", "GCP", "Kubernetes", "Docker"],
    "AI & Machine Learning": [
      "Deep learning",
      "NLP",
      "Practical AI applications",
    ],
  },
  "Jason Michael (Pro)": {
    "Cloud Native Computing": ["AWS", "GCP", "Kubernetes", "Docker"],
    "React Native for beginners": [
      "React Native",
      "Expo",
      "Mobile App Deployment",
    ],
  },
  "Marcus Gabbe (Pro)": {
    "Python for Data Science": ["Introduction to Python", "Numpy", "Pandas"],
    "Modern Full stack Next.js course": [
      "Next.js App router & Server components",
      "Tailwind CSS",
      "Database integration with Drizzle ORM",
      "Authentication with Clerk",
      "Typescript best practices",
      "Deployment & CI/CD",
    ],
  },
  "John Doe (Pro)": {
    "React Native for beginners": [
      "React Native",
      "Expo",
      "Mobile App Deployment",
    ],
    "Python for Data Science": ["Introduction to Python", "Numpy", "Pandas"],
  },
  "Samson Lannister (Pro)": {
    "Modern Full stack Next.js course": [
      "Next.js App router & Server components",
      "Tailwind CSS",
      "Database integration with Drizzle ORM",
      "Authentication with Clerk",
      "Typescript best practices",
      "Deployment & CI/CD",
    ],
    "Cloud Native Computing": ["AWS", "GCP", "Kubernetes", "Docker"],
  },
};

async function comprehensiveSeed() {
  console.log("🌱 Starting Comprehensive Seeding database...");
  console.log("🌱 Seeding users...");

  try {
    //clear existing data
    console.log("🌱 Clearing existing data...");
    await db.delete(conversationSummaries);
    await db.delete(messages);
    await db.delete(conversations);
    await db.delete(matches);
    await db.delete(learningGoals);
    await db.delete(communityMembers);
    await db.delete(communities);
    await db.delete(users);
    console.log("Database cleared");

    //1. Create FREE users
    console.log("Creating FREE Users");
    const createdFreeUsers: any[] = [];
    for (const user of FREE_USERS) {
      const [created] = await db.insert(users).values(user).returning();
      createdFreeUsers.push(created);
      console.log("Created FREE User:", user.name);
    }

    //2. Create PRO users
    console.log("Creating PRO Users");
    const createdProUsers: any[] = [];
    for (const user of PRO_USERS) {
      const [created] = await db.insert(users).values(user).returning();
      createdProUsers.push(created);
      console.log("Created PRO User:", user.name);
    }

    const allUsers = [...createdFreeUsers, ...createdProUsers];
    console.log("allUsers", allUsers);

    //3. Create Communities
    console.log("Creating Communities");
    const createdCommunities: any[] = [];
    for (const community of COMMUNITIES_DATA) {
      const [created] = await db
        .insert(communities)
        .values({
          ...community,
          createdById: createdProUsers[0].id,
        })
        .returning();
      createdCommunities.push(created);
      console.log("Created community:", created.name);
    }

    //4. Adding FREE users to Communities
    console.log("Adding FREE users to Communities(1 each)");
    for (const [userName, assignment] of Object.entries(
      FREE_USERS_ASSIGNMENTS,
    )) {
      const user = allUsers.find((user) => user.name.trim() === userName);
      const communities = createdCommunities.find(
        (community) => community.name === assignment.community,
      );

      await db.insert(communityMembers).values({
        userId: user.id,
        communityId: communities.id,
      });

      console.log(
        "Created community member:",
        userName + " -> " + assignment.community,
      );
    }

    //5. Adding PRO users to Communities
    console.log("Adding PRO users to Communities(unlimited)");
    for (const [userName, communityNames] of Object.entries(
      PRO_USERS_COMMUNITIES_ASSIGNMENTS,
    )) {
      const user = allUsers.find((user) => user.name === userName);
      for (const communityName of communityNames) {
        const community = createdCommunities.find(
          (community) => community.name === communityName,
        );

        await db.insert(communityMembers).values({
          userId: user.id,
          communityId: community.id,
        });

        console.log(
          "Created community member:",
          userName + " -> " + communityNames.length + "Communities",
        );
      }
    }

    //6. Create template learning GOALS for users
    console.log("Creating template learning GOALS for users");
    const createdGoals: any[] = [];
    for (const [communityName, goals] of Object.entries(LEARNING_GOALS_DATA)) {
      const community = createdCommunities.find(
        (community) => community.name === communityName,
      );
      for (const goal of goals) {
        const [created] = await db
          .insert(learningGoals)
          .values({
            userId: createdProUsers[0].id,
            communityId: community.id,
            ...goal,
            tags: [],
          })
          .returning();
        createdGoals.push({ ...created, communityName });
      }
      console.log(
        "Created learning goals:",
        goals.length + "goals for " + communityName,
      );
    }

    //7. Assign goals to FREE users
    console.log("Assign goals to FREE users");
    for (const [userName, assignment] of Object.entries(
      FREE_USERS_ASSIGNMENTS,
    )) {
      const user = allUsers.find((user) => user.name === userName);
      const community = createdCommunities.find(
        (community) => community.name === assignment.community,
      );
      const templateGoal = createdGoals.find(
        (goal) =>
          goal.title === assignment.goal &&
          goal.communityName === assignment.community,
      );

      await db.insert(learningGoals).values({
        userId: user.id,
        communityId: community.id,
        title: templateGoal.title,
        description: templateGoal.description,
        tags: templateGoal.tags || [],
      });

      console.log(
        "Created community member:",
        userName + " -> " + assignment.goal,
      );
    }

    //8. Assign goals to PRO users
    console.log("Assign goals to PRO users");
    for (const [userName, communities] of Object.entries(
      PRO_USERS_GOALSASSIGNMENTS,
    )) {
      const user = allUsers.find((user) => user.name === userName);
      let totalGoals = 0;

      for (const [communityName, goalTitles] of Object.entries(communities)) {
        const community = createdCommunities.find(
          (community) => community.name === communityName,
        );

        for (const goalTitle of goalTitles) {
          const templateGoal = createdGoals.find(
            (goal) =>
              goal.title === goalTitle && goal.communityName === communityName,
          );

          if (templateGoal) {
            await db.insert(learningGoals).values({
              userId: user.id,
              communityId: community.id,
              title: templateGoal.title,
              description: templateGoal.description,
              tags: templateGoal.tags || [],
            });
            totalGoals++;
          }
        }
      }

      console.log("Created goals:", userName + " -> " + totalGoals + "goals");
    }

    //9. Create matches
    console.log("Creating matches...");
    const MATCHES = [
      ["Charles Hill (Pro)", "Free User Three", "AI & Machine Learning"],
      [
        "Free User One",
        "Marcus Gabbe (Pro)",
        "Modern Full stack Next.js course",
      ],
      ["Ema Scott (Pro)", "John Doe (Pro)", "React Native for beginners"],
      ["Free User Two", "Charles Hill (Pro)", "CodedLibra Youtube community"],
      ["Free User Four", "Susan Bradford (Pro)", "Cloud Native Computing"],
      [
        "Esther Paul (Pro)",
        "Samson Lannister (Pro)",
        "Python for Data Science",
      ],
      ["Free User Six", "Jason Michael (Pro)", "React Native for beginners"],
    ];

    const createdMatches: Array<{
      id: string;
      user1Id: string;
      user2Id: string;
      communityId: string;
      status: string;
      user1Name: string;
      user2Name: string;
    }> = [];

    for (const [name1, name2, communityName] of MATCHES) {
      console.log(name1, name2, communityName);
      const user1 = allUsers.find((user) => user.name === name1);
      const user2 = allUsers.find((user) => user.name === name2);
      const community = createdCommunities.find(
        (community) => community.name === communityName,
      );

      if (!user1 || !user2 || !community) {
        const user_status = Math.random() > 0.5 ? "accepted" : "pending";
        const [match] = await db
          .insert(matches)
          .values({
            user1Id: user1.id,
            user2Id: user2.id,
            communityId: community.id,
            status: user_status,
          })
          .returning();
        createdMatches.push({
          ...match,
          user1Name: name1,
          user2Name: name2,
        });

        console.log(
          `Created goals:,
          ${name1} -> ${name2} ${user_status}`,
        );
      }
    }

    //10: Create conversations for accepted matches
    console.log("Creating conversations for accepted matches");
    const acceptedMatches = createdMatches.filter(
      (match) => match.status === "accepted",
    );

    const createdConversations: Array<{
      id: string;
      matchId: string;
      match: (typeof createdMatches)[0];
    }> = [];

    for (const match of acceptedMatches) {
      const [conversation] = await db
        .insert(conversations)
        .values({
          matchId: match.id,
          lastMessageAt: new Date(
            Date.now() - Math.floor(Math.random() * 2 * 24 * 60 * 60 * 1000),
          ),
        })
        .returning();

      createdConversations.push({
        ...conversation,
        match,
      });
      console.log(
        "Conversation for:",
        match.user1Name + "->" + match.user2Name + "",
      );
    }

    //11: Create messages for conversations
    console.log("Creating messages for conversations");
    const messageTemplates = [
      {
        sender: "user1",
        content: "Hello, how are you?",
      },
      {
        sender: "user2",
        content: "I am fine, how about you?",
      },
      {
        sender: "user1",
        content: "I am also fine, what about you?",
      },
      {
        sender: "user2",
        content: "I am also fine, what about you?",
      },
    ];

    for (const conv of createdConversations) {
      // We use the IDs from the match tied to this conversation
      const senderId = conv.match.user1Id;
      const receiverId = conv.match.user2Id;

      for (const [index, template] of messageTemplates.entries()) {
        await db.insert(messages).values({
          conversationId: conv.id,
          senderId: template.sender === "user1" ? senderId : receiverId,
          content: template.content,
        });
      }

      console.log(
        `💬 Injected ${messageTemplates.length} messages into conversation for: ${conv.match.user1Name}`,
      );
    }
  } catch (error) {
    console.error(error);
  }
}

comprehensiveSeed();
