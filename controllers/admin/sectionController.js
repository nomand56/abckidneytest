const Section = require("../../models/section");

const sectionController = {
  createSection: async (req, res) => {
    try {
      const newSection = new Section(req.body);
      await newSection.save();
      res.status(201).json(newSection);
    } catch (error) {
      res.status(500).json({ error: "Error creating a Section" });
    }
  },

  getAllSections: async (req, res) => {
    try {
      const Sections = await Section.find();
      res.json(Sections);
    } catch (error) {
      res.status(500).json({ error: "Error getting Sections" });
    }
  },

  getSectionById: async (req, res) => {
    try {
      const Section = await Section.findById(req.params.SectionId);
      if (!Section) {
        return res.status(404).json({ error: "Section not found" });
      }
      res.json(Section);
    } catch (error) {
      res.status(500).json({ error: "Error getting the Section" });
    }
  },

  updateSectionById: async (req, res) => {
    try {
      const updatedSection = await Section.findByIdAndUpdate(
        req.params.SectionId);
      updatedSection.title = req.body.title;
      updatedSection.description = req.body.description;
      
      res.json(updatedSection);
    } catch (error) {
      res.status(500).json({ error: "Error updating the Section" });
    }
  },

  deleteSectionById: async (req, res) => {
    try {
      console.log("delete completed by id", req.params.id)
      await Section.findByIdAndRemove(req.params.id);
      res.json({ message: "Section deleted" });
      
    } catch (error) {
      res.status(500).json({ error: "Error deleting the Section" });
    }
  },
};

module.exports = sectionController;
