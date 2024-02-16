  const allPages = [
      {topicId: 1, subtopicName: 'Nephron Microanatomy', allLinks: ['Topic A', 'Topic B', 'Topic C']},
      {topicId: 2, subtopicName: 'Water Distribution', allLinks: ['Topic A', 'Topic B', 'Topic C']}
    ]
    
    const nephronObjectives = [
      ["Be able to identify the microanatomy of the nephron",
      "Understand how the nephron and its parts are oriented within the kidney",
      "Describe the complex of the afferent arteriole and distal convoluted tubule forming the juxtaglomerular apparatus"],
      ["Be able to describe the main function of each section of the nephron",
      "Can list the unique features of each nephron segment",
      "Can recognize the site of action for the diuretics, acetazolamide, loop diuretics, thiazides and mineralocorticoid receptor antagonists"]]
    
      const saltwaterObjectives = [
        [
          "Identify the passive and active mechanisms involved in sodium reabsorption in the proximal convoluted tubule.",
          "Explain the role of the sodium-potassium ATPase pump in maintaining electrochemical gradients.",
          "Describe the role of SGLT2 in reabsorbing glucose and sodium and the mechanism and therapeutic implications of SGLT2 inhibitors.",
          "Recognize the active process of sodium reabsorption at the thick ascending limb and the role of the sodium, potassium, 2 chloride cotransporter (NKCC2) and its inhibition by loop diuretics.",
          "Examine sodium reabsorption in the distal convoluted tubule and the impact of thiazide diuretics.",
          "Understand sodium reabsorption in the cortical connecting tubule and collecting duct, and the role of aldosterone.",
        ],
        [
          "Differentiate between total body sodium and serum sodium concentration.",
          "Understand that deviations from normal serum sodium concentrations are water disorders NOT salt disorders.",
          "Describe the relationship between total body water and total body sodium.",
          "Demonstrate how the total body water and total body sodium relationship changes with various clinical scenarios.",
        ],
        [
          "Differentiate between total body sodium and serum sodium concentration.",
          "Understand that deviations from normal serum sodium concentrations are water disorders NOT salt disorders.",
          "Describe the relationship between total body water and total body sodium.",
          "Demonstrate how the total body water and total body sodium relationship changes with various clinical scenarios.",
        ],
      ];
      
    const acidBaseObjectives = [
      ["Learning Objective 1"],["Learning Objective 2"],["Learning Objective 3"]
    ]
    
    const topics = [
      { id: 1, name: 'The Nephron', path: '/nephron', subtopics: [['Nephron Microanatomy', '/nephronMicroanatomy'], ['Nephron Function', '/nephronFunction']], subsubtopics: allPages, objectives:nephronObjectives},
      { id: 2, name: 'Sodium & Water', path: '/salt', subtopics: [['Water Distribution', '/waterDistribution'], ['Sodium Distribution', '/saltDistribution'], ['Total Body Sodium','/totalBodySalt'], ['Total Body Water', '/totalBodyWater']], subsubtopics: allPages, objectives:saltwaterObjectives },
      { id: 3, name: 'Acids & Bases', path: '/acidsbases', subtopics: [['SubTopic 1', '/acidBaseSub'], ['SubTopic 2', '/acidBaseSub'], ['SubTopic 3', '/acidBaseSub']], subsubtopics: allPages, objectives: acidBaseObjectives},
    ];
    export { allPages, nephronObjectives, saltwaterObjectives, acidBaseObjectives, topics };  