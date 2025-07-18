import prisma from "../lib/prisma.js";

export const createHackathon = async (req, res) => {
  console.log("📥 createHackathon payload:", req.body, "userId:", req.userId);
  try {
    const { eventMode, hackathonLink } = req.body;
    if (!eventMode || !hackathonLink) {
      return res.status(400).json({ error: "eventMode and hackathonLink are required." });
    }
    // Validation
    const allowedModes = ["Online", "Offline", "Hybrid"];
    if (!allowedModes.includes(eventMode)) {
      return res.status(400).json({ error: "eventMode must be Online, Offline, or Hybrid" });
    }
    if (typeof hackathonLink !== "string" || !hackathonLink.startsWith("http")) {
      return res.status(400).json({ error: "hackathonLink must be a valid URL" });
    }
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newHackathon = await prisma.hackathon.create({
      data: {
        title:           req.body.title,
        description:     req.body.description,
        theme:           req.body.theme,
        hackathonDate:   req.body.hackathonDate ? new Date(req.body.hackathonDate) : null,
        deadline:        req.body.deadline ? new Date(req.body.deadline) : null,
        location:        req.body.location,
        organizer:       req.body.organizer,
        eventMode:       req.body.eventMode,
        hackathonLink:   req.body.hackathonLink,
        registrationFee: req.body.registrationFee,
        rounds:          Array.isArray(req.body.rounds) ? req.body.rounds.join(",") : req.body.rounds || null,
        tags:            req.body.tags || [],
        techStack:       req.body.techStack || [],
        rolesNeeded:     req.body.rolesNeeded || [],
        maxTeamSize:     Number(req.body.maxTeamSize),
        visibility:      req.body.visibility || "Public",
        user: {
          connect: { id: user.id }
        }
      }
    });
    return res.status(201).json(newHackathon);
  } catch (err) {
    console.error("❌ createHackathon error:", err);
    if (err.code === 'P2002' || err.name === 'PrismaClientValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await prisma.hackathon.findMany();
    // Parse rounds string to array for each hackathon
    const result = hackathons.map(h => ({
      ...h,
      rounds: h.rounds ? h.rounds.split(",") : [],
    }));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hackathons." });
  }
};
