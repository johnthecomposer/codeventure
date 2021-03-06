var bookliteral = {
	  pages: {
		theinn: {
		  title: "The Inn Of George McFinn",
		  narrative: "Let's go to the inn. Because that's where every adventure begins. Ale, mutton, wenches. Maybe a fight, or maybe trivia night. Either way, it's always a good time at the inn.",
		  image: "inn.jpg",
		  choices: {
			theblacksmith: "Go to the blacksmith for some shoes?",
			thesage: "Something doesn't seem right. Portent of doom, or just bad weather? Consult the sage before proceeding?",
			myhorseisburied: "Rescue your horse?"
		  }
		},
		theblacksmith: {
		  title: "The Blacksmith",
		  narrative: "The horse could use new shoes, and you can always use a new weapon. Blacksmith?",
		  image: "blacksmith.jpg",
		  choices: {
			myhorseisburied: "Set out to the snow-capped peak?",
			theinn: "Go back to the inn for some takeout before your quest?"
		  }
		},
		thesage: {
		  title: "The Sage",
		  narrative: "Please rid me of the harpies and get me some food.",
		  image: "sage.jpg",
		  choices: {
			myhorseisburied: "Set out to the snow-capped peak?",
			theinn: "Go back to the inn for some takeout before your quest?",
			theblacksmith: "Go to the blacksmith for some shoes?"
		  }
		},
		myhorseisburied: {
		  title: "My Horse Is Buried",
		  narrative: "I think we're ready for the snow to melt.",
		  image: "horseburied.jpg",
		  choices: {
			thesage: "Find a sage to explain the black sky?",
			theinn: "Go back to the inn for some takeout before your quest?",
			theblacksmith: "Go to the blacksmith for some shoes?"
		  }
		},
		mountainjourney: {
		  title: "Mountain Journey",
		  narrative: "Everybody likes a mountain journey. Unless, of course, it's snowing and the only path is through giant territory.\n\nYes, it's snowing and the only path is through giant territory. What next?",
		  image: "Mountain.jpg",
		  choices: {
			theinn: "Give up and go to the inn?",
			theblacksmith: "Find some warm clothing and weapons at the inn?"
		  }
		},
		friendsofthedevil: {
		  title: "Friend of the Devil",
		  narrative: "You\'ve spent the earlier part of the evening wandering around the village. Now you\'re in an unfamiliar part of town.\n\nSomeone has let the lanterns burn out. The streets are very dark, and the only sound is that of the horses in a nearby stable...\n\n...or is that sound something else?\n\nA sepulchral voice speaks from the direction of the stables: \"Be ye friend or enemy?\"",
		  image: "DevilFriend.jpg",
		  choices: {
			thesage: "Ignore the voice and go to the sage for advice?",
			mountainjourney: "Go to the mountain?"
		  }
		},
		trust: {
		  title: "Trust",
		  narrative: "I don't make friends easily, but I'll not call you an enemy just yet. Show your face, stranger.\", you say to the voice.",
		  image: "Trust.jpg",
		  choices: {
			theblacksmith: "Need a new shield and some spikes for your boots?",
			theinn: "Get some rest and catch up on news at the inn?"
		  }
		},
		animalconsultation: {
		  title: "Animal Consultation",
		  narrative: "There's a dog barking like mad behind the hut. The sheep have scattered. A shepherd is attempting to calm the animals. See what the commotion is about?",
		  image: "AnimalConsultation.jpg",
		  choices: {
			friendsofthedevil: "Continue wandering the town?",
			trust: "Whose advice should you take?"
		  }
		},
		fortydays: {
		  title: "40 Days!",
		  narrative: "It's been raining for 39 days without respite. The plain is flooded, and all the animals have gone into hiding.",
		  image: "fortydays.jpg",
		  choices: {
			trust: "Speak to the voice in the dark?",
			thesage: "To the sage for advice?"
		  }
		},
		whentheshthitsthearmor: {
		  title: "When The Sh*t Hits The Armor",
		  narrative: "Last time you found yourself in a place like this, you were only 10 years old. It was in a cave outside your village, where the kids would go to explore. One day, you and your friends found a new passage to an inner cavern, which led through the hill to the other side. The journey only took about half an hour but it felt like days while you were in the dark. As soon as the first ray of light shone through a crack, everybody ran toward it -- and then the smell hit -- and then, black wings everywhere. Bats. Guano. The only way out without retracing your steps.",
		  image: "Guano.jpg",
		  choices: {
			animalconsultation: "Everybody needs to talk to animals.",
			mountainjourney: "Makes you want to go through the mountains, doesn't it?",
			myhorseisburied: "Go to the inn?",
			thesage: "Visit the sage for advice?",
			fortydays: "Get some quality alone time in the desert?"
		  }
		}
	  },
	  selectedPage: ""
}