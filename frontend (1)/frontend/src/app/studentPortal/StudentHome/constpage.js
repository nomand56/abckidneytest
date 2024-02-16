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
  ["Identify the compartments of the body",
  "Describe how water is distributed across each compartment",
  "Describe how gain or loss of water will affect each compartment"],
  ["Understand how sodium is distributed across body compartments", 
  "Identify that sodium is the most important determinant of extracellular volume", 
  "Understand how sodium is distributed across body compartments", 
  "Describe how a salt load will impact the intracellular and extracellular compartments"], 
  ["Recognize that total body sodium is a reflection of the patients extracellular space",
  "Understand the concept that total body sodium is the main determinant of mean arterial pressure, left ventricular filling pressures and blood pressure",
  "Understand the concepts of hypervolemia and hypovolemia",
  "Describe a physical exam of a patient with low total body sodium",
  "Describe a physical exam of a patient with high total body sodium"],
  ["Differentiate between total body sodium and serum sodium concentration",
  "Understand that deviations from normal serum sodium concentrations are water disorders NOT salt disorders",
  "Describe the relationship between total body water and total body sodium",
  "Demonstrate how the total body water and total body sodium relationship changes with various clinical scenarios"],
  ["Differentiate between total body sodium and serum sodium concentration",
  "understand that deviations from normal serum sodium concentrations are water disorders NOT salt disorders",
  "Describe the relationship between total body water and total body sodium",
  "Demonstrate how the total body water and total body sodium relationship changes with various clinical scenarios"]]
  
  const acidBaseObjectives = [
    ["Learning Objective 1"],["Learning Objective 2"],["Learning Objective 3"]
  ]
  
  const topics = [
    { id: 1, name: 'The Nephron', path: '/nephron', subtopics: [['Nephron Microanatomy', '/nephronMicroanatomy'], ['Nephron Function', '/nephronFunction']], subsubtopics: allPages, objectives:nephronObjectives},
    { id: 2, name: 'Sodium & Water', path: '/salt', subtopics: [['Water Distribution', '/waterDistribution'], ['Sodium Distribution', '/saltDistribution'], ['Total Body Sodium','/totalBodySalt'], ['Total Body Water', '/totalBodyWater']], subsubtopics: allPages, objectives:saltwaterObjectives },
    { id: 3, name: 'Acids & Bases', path: '/acidsbases', subtopics: [['SubTopic 1', '/acidBaseSub'], ['SubTopic 2', '/acidBaseSub'], ['SubTopic 3', '/acidBaseSub']], subsubtopics: allPages, objectives: acidBaseObjectives},
  ];
  export { allPages, nephronObjectives, saltwaterObjectives, acidBaseObjectives, topics };  