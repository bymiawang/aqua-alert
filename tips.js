// Get references to the tips and tags elements
const tipsContainer = document.querySelector('#tips');
const tagsContainer = document.querySelector('#tags');

// Get all the tags in the page
const tags = tagsContainer.querySelectorAll('a');

// Add event listener to each tag
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    // Get the tag name
    const tagName = tag.textContent;

    // Filter the tips by the tag name
    const filteredTips = tips.filter(tip => {
      return tip.tags.includes(tagName);
    });

    // Display the filtered tips
    displayTips(filteredTips);
  });
});

// Get all the tips in the page
const tips = [
  {
    title: 'Use a low-flow showerhead',
    description: 'A low-flow showerhead can help you save water while still providing a satisfying shower experience. Look for a showerhead with a flow rate of 2.5 gallons per minute or less.',
    tags: ['Bathroom', 'Shower', 'Low-flow'],
  },
  {
    title: 'Water your lawn in the early morning or late evening',
    description: 'Watering your lawn during the heat of the day can cause a lot of water to evaporate. Watering in the early morning or late evening can help you save water and keep your lawn healthy.',
    tags: ['Outdoor', 'Lawn', 'Drought-Conditions'],
  },
  {
    title: 'Capture rainwater for outdoor use',
    description: 'You can capture rainwater from your roof in a rain barrel and use it to water your garden or lawn. This can help you save water and reduce your reliance on municipal water supplies.',
    tags: ['Outdoor', 'Lawn', 'Drought-Conditions'],
  },
  {
    title: 'Fix leaks promptly',
    description: 'A dripping faucet or a leaky toilet can waste a lot of water over time. Fixing leaks promptly can help you save water and money on your water bill.',
    tags: ['Indoor', 'Plumbing', 'Drought-Conditions'],
  },
  {
    title: 'Choose native plants for your garden',
    description: 'Native plants are adapted to the local climate and require less water than non-native plants. Choosing native plants for your garden can help you save water and create a beautiful landscape.',
    tags: ['Outdoor', 'Garden', 'Drought-Conditions'],
  },
  {
    title: 'Use a broom instead of a hose to clean outdoor spaces',
    description: 'Using a broom to clean your driveway, patio, or other outdoor spaces can help you save water and reduce your water bill. Avoid using a hose to clean these areas whenever possible.',
    tags: ['Outdoor', 'Cleaning', 'Tools'],
  },
  {
    title: 'Use a pool cover to reduce evaporation',
    description: 'If you have a swimming pool, using a pool cover when it is not in use can help reduce evaporation and save water. A pool cover can also help keep your pool clean and reduce the need for chemical treatments.',
    tags: ['Outdoor', 'Garden', 'Drought-Conditions'],
  },
  {
    title: 'Choose water-efficient appliances',
    description: 'When it is time to replace your dishwasher, washing machine, or other appliances, choose models that are labeled as water-efficient. These appliances use less water and can help you save money on your water bill.',
    tags: ['Indoor', 'Tools', 'Drought-Conditions'],
  },
  {
    title: 'Take shorter showers',
    description: 'Limiting showers from 5 to 8 minutes can save gallons of water. Avoid taking long baths and turn off the water to soap up in the shower.',
    tags: ['Bathroom', 'Indoor', 'Low-flow'],
  },
];

// Display all the tips
displayTips(tips);

// Display tips that match the search term
function searchTips(searchTerm) {
  const filteredTips = tips.filter(tip => {
    const titleMatch = tip.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });

  displayTips(filteredTips);
}

// Display the given tips in the tips container
function displayTips(tips) {
  tipsContainer.innerHTML = '';

  tips.forEach(tip => {
    const tipEl = document.createElement('div');
    tipEl.classList.add('tip');

    const titleEl = document.createElement('h2');
    titleEl.textContent = tip.title;

    const descEl = document.createElement('p');
    descEl.textContent = tip.description;

    const tagsEl = document.createElement('ul');
    tagsEl.classList.add('tags');

    tip.tags.forEach(tag => {
      const tagEl = document.createElement('li');
      const tagLink = document.createElement('a');
      tagLink.textContent = tag;
      tagEl.appendChild(tagLink);
      tagsEl.appendChild(tagEl);
    });

    tipEl.appendChild(titleEl);
    tipEl.appendChild(descEl);
    tipEl.appendChild(tagsEl);

    tipsContainer.appendChild(tipEl);
  });
}

// Get the search input element
const searchInput = document.querySelector('#search2 input[type="text"]');

// Add event listener to the search input element
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  searchTips(searchTerm);
});
