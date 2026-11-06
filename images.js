/* Digivern images for news items, keyed by news id. One entry per line.
   The daily update ADDS requests; the "Process images" GitHub Actions job turns them into images and fills in the rest.

   Request (written by the daily update):
     "n52":{"status":"requested","alt":"What the image shows, for screen readers","commons":"File:Exact file name on Wikimedia Commons.jpg","prompt":"Scene to draw if no usable photo","noAi":false}
     - commons: a Wikimedia Commons file that shows a place, building, infrastructure, technology or sector scene relevant to the story.
       Never a photo whose subject is a public figure or an identifiable person. The job checks the licence itself and only accepts
       public domain, CC0, CC BY or CC BY-SA files with no extra restrictions.
     - prompt: used for an AI-generated illustration only if there is no usable photo. No real people, no logos, no text, no flags or emblems.
     - noAi: true for elections, conflict, disasters, crime, health emergencies or any story where an illustration could mislead
       (then the item simply has no image if no photo is usable).

   Result (written by the job): status "done" with src (img/<id>.webp), w, h, kind ("photo" | "ai"), credit, license, licenseUrl, sourceUrl;
   or status "failed" with a reason. The site shows only "done" entries. */
window.DV_IMAGES = {
  "n59":{"status": "requested", "alt": "The Centre Block of Canada’s Parliament buildings in Ottawa.", "commons": "File:Centre Block - Parliament Hill.jpg", "prompt": "Open-plan government office with civil servants’ desks, laptops and a large screen showing abstract data dashboards, seen from behind with no faces.", "noAi": false},
  "n55":{"status": "requested", "alt": "Paper registers and monthly report forms stacked on a desk in a health facility records room.", "commons": "", "prompt": "A small health clinic records room with paper registers and monthly report forms stacked on a desk next to a switched-off desktop computer, daylight through a window.", "noAi": false},
  "n54":{"status": "requested", "alt": "View over Prishtina, the capital of Kosovo.", "commons": "File:Prishtina seen from Mother Theresa Cathedral.jpg", "prompt": "A smartphone on a table showing an abstract digital wallet screen with an identity card icon and a signature symbol, no text.", "noAi": false},
  "n57":{"status": "requested", "alt": "A smartphone showing a digital ID card in a government services app.", "commons": "", "prompt": "A hand holding a smartphone that shows an abstract digital ID card and a list of service icons, in a bright public service office, no text or logos.", "noAi": false},
  "n56":{"status": "requested", "alt": "A customer scanning a QR code at a shop counter with a smartphone.", "commons": "", "prompt": "A customer at a retail store counter scanning a printed QR code stand with a smartphone, shop shelves blurred in the background, no logos or text.", "noAi": false},
  "n58":{"status": "requested", "alt": "A login screen on a laptop in a home office.", "commons": "", "prompt": "A laptop on a desk showing an abstract login screen with a padlock symbol, evening light.", "noAi": true},
  "n50":{"status": "requested", "alt": "Blood bags stored in a refrigerated cabinet.", "commons": "", "prompt": "A refrigerated storage room with racks of blood bags and a temperature control panel.", "noAi": true},
  "n48":{"status": "requested", "alt": "Abstract illustration of bank-to-bank payment flows.", "commons": "", "prompt": "Office building in an East African city at dusk with stylised lines of light connecting it to other bank buildings, suggesting interbank payment flows; no text or logos.", "noAi": false},
  "n49":{"status": "requested", "alt": "A person paying with a mobile phone app at a small shop in Bangladesh.", "commons": "", "prompt": "A small grocery shop counter in South Asia where a customer pays with a smartphone app, shelves of goods behind, no logos or text.", "noAi": false},
  "n53":{"status": "requested", "alt": "A hospital cashier desk where a patient pays by mobile phone.", "commons": "", "prompt": "A hospital reception and cashier desk in East Africa where a patient holds up a mobile phone to pay, nurses in the background with faces not visible, no logos.", "noAi": false},
  "n51":{"status": "requested", "alt": "The Abu Dhabi skyline seen from the Marina.", "commons": "File:Abu Dhabi Skyline from Marina,jpg.jpg", "prompt": "A modern government office where a large screen shows building permit plans being checked against rule documents by software, abstract icons only, no text.", "noAi": false}
};
