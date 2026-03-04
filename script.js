 // Default Configuration
    const defaultConfig = {
      product_title: 'Master Digital Skills & Transform Your Career',
      product_tagline: 'The ultimate comprehensive course',
      original_price: '499',
      sale_price: '299',
      whatsapp_number: '+9779800000000',
      background_color: '#0a0a0a',
      surface_color: '#1a1a2e',
      text_color: '#ffffff',
      primary_color: '#FFD700',
      secondary_color: '#22C55E'
    };

    // State
    let copiesLeft = 20;
    let countdownTime = 2 * 60 * 60 + 45 * 60 + 30; // 2h 45m 30s in seconds
    let notificationIndex = 0;
    let notificationTimeouts = [30000, 60000, 120000];

    // Fake names for notifications
    const fakeNames = [
      'Someone from Kathmandu', 'A student from Pokhara', 'Someone from Lalitpur',
      'A buyer from Bhaktapur', 'Someone from Chitwan', 'A learner from Butwal',
      'Someone from Biratnagar', 'A student from Dharan', 'Someone from Hetauda',
      'A buyer from Birgunj', 'Someone from Nepalgunj', 'A learner from Dhangadi',
      'Someone from Janakpur', 'A student from Bharatpur', 'Someone from Itahari',
      'A buyer from Damak', 'Someone from Tulsipur', 'A learner from Ghorahi',
      'Someone from Siddharthanagar', 'A student from Lahan'
    ];

    // Chapter data
    const chapters = {
      1: { title: 'Foundation Basics', content: 'In this chapter, you will learn the fundamental concepts that form the backbone of all advanced techniques. We cover terminology, basic principles, and essential theory that every professional needs to know.' },
      2: { title: 'Core Techniques', content: 'Master the essential techniques used by industry professionals. This chapter includes step-by-step tutorials on core methodologies, best practices, and proven approaches that deliver results.' },
      3: { title: 'Advanced Strategies', content: 'Take your skills to the next level with advanced strategies. Learn sophisticated methods, complex problem-solving approaches, and expert-level techniques that set professionals apart.' },
      4: { title: 'Practical Projects', content: 'Apply everything you\'ve learned through hands-on projects. Work on real-world scenarios that mirror actual industry challenges and build a portfolio you can showcase.' },
      5: { title: 'Industry Secrets', content: 'Discover insider knowledge that isn\'t taught anywhere else. Learn the shortcuts, hacks, and secret techniques that top performers use to get ahead.' },
      6: { title: 'Tools & Resources', content: 'Get access to premium tools, software recommendations, and exclusive resources. Learn which tools the pros use and how to maximize your productivity.' },
      7: { title: 'Case Studies', content: 'Analyze real success stories and learn from actual implementations. Understand what worked, what didn\'t, and how to apply these lessons to your own journey.' },
      8: { title: 'Optimization Tips', content: 'Learn how to optimize your workflow, maximize efficiency, and achieve better results in less time. Includes time management and productivity techniques.' },
      9: { title: 'Automation Guide', content: 'Discover how to automate repetitive tasks and scale your efforts. Learn about automation tools, workflows, and systems that multiply your output.' },
      10: { title: 'Growth Hacking', content: 'Master creative, low-cost strategies for rapid growth. Learn unconventional techniques that can accelerate your progress exponentially.' },
      11: { title: 'Monetization', content: 'Transform your skills into income streams. Learn various monetization models, pricing strategies, and how to build a sustainable career or business.' },
      12: { title: 'Future Trends', content: 'Stay ahead of the curve by understanding emerging trends and future opportunities. Prepare yourself for what\'s coming and position yourself for success.' }
    };

    // Initialize Element SDK
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
          updateUI(config);
        },
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => window.elementSdk.setConfig({ background_color: value })
            },
            {
              get: () => config.surface_color || defaultConfig.surface_color,
              set: (value) => window.elementSdk.setConfig({ surface_color: value })
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => window.elementSdk.setConfig({ text_color: value })
            },
            {
              get: () => config.primary_color || defaultConfig.primary_color,
              set: (value) => window.elementSdk.setConfig({ primary_color: value })
            },
            {
              get: () => config.secondary_color || defaultConfig.secondary_color,
              set: (value) => window.elementSdk.setConfig({ secondary_color: value })
            }
          ],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
          ['product_title', config.product_title || defaultConfig.product_title],
          ['product_tagline', config.product_tagline || defaultConfig.product_tagline],
          ['original_price', config.original_price || defaultConfig.original_price],
          ['sale_price', config.sale_price || defaultConfig.sale_price],
          ['whatsapp_number', config.whatsapp_number || defaultConfig.whatsapp_number]
        ])
      });
    }

    function updateUI(config) {
      const c = { ...defaultConfig, ...config };
      
      // Update prices
      document.querySelectorAll('#top-original-price, #hero-original-price, #sticky-original-price, #final-original-price').forEach(el => el.textContent = c.original_price);
      document.querySelectorAll('#top-sale-price, #hero-sale-price, #sticky-sale-price, #final-sale-price').forEach(el => el.textContent = c.sale_price);
      
      // Update WhatsApp link
      const waBtn = document.getElementById('whatsapp-btn');
      if (waBtn) waBtn.href = `https://wa.me/${c.whatsapp_number.replace(/[^0-9]/g, '')}`;
    }

    // Countdown Timer
    function updateCountdown() {
      if (countdownTime <= 0) return;
      countdownTime--;
      
      const hours = Math.floor(countdownTime / 3600);
      const minutes = Math.floor((countdownTime % 3600) / 60);
      const seconds = countdownTime % 60;
      
      const h = String(hours).padStart(2, '0');
      const m = String(minutes).padStart(2, '0');
      const s = String(seconds).padStart(2, '0');
      
      document.querySelectorAll('#countdown-hours, #hero-hours, #sticky-hours, #final-hours').forEach(el => el.textContent = h);
      document.querySelectorAll('#countdown-minutes, #hero-minutes, #sticky-minutes, #final-minutes').forEach(el => el.textContent = m);
      document.querySelectorAll('#countdown-seconds, #hero-seconds, #sticky-seconds, #final-seconds').forEach(el => el.textContent = s);
    }

    setInterval(updateCountdown, 1000);

    // Update copies count
    function updateCopies() {
      document.querySelectorAll('#copies-left, #hero-copies, #sticky-copies, #final-copies').forEach(el => el.textContent = copiesLeft);
    }

    // Notification System
    function showNotification() {
      if (notificationIndex >= 20) return;
      
      const popup = document.getElementById('notification-popup');
      const nameEl = document.getElementById('notification-name');
      
      nameEl.textContent = fakeNames[notificationIndex];
      popup.classList.remove('hidden');
      popup.classList.add('flex');
      
      // Decrease copies
      if (copiesLeft > 5) {
        copiesLeft--;
        updateCopies();
      }
      
      setTimeout(() => {
        popup.classList.add('hidden');
        popup.classList.remove('flex');
        
        notificationIndex++;
        if (notificationIndex < 20) {
          const nextDelay = notificationTimeouts[Math.min(notificationIndex, notificationTimeouts.length - 1)] * (1 + notificationIndex * 0.5);
          setTimeout(showNotification, nextDelay);
        }
      }, 4000);
    }

    // Start notifications after 30 seconds
    setTimeout(showNotification, 30000);

    // Read More Toggle
    document.getElementById('read-more-btn').addEventListener('click', function() {
      const expanded = document.getElementById('expanded-summary');
      if (expanded.classList.contains('hidden')) {
        expanded.classList.remove('hidden');
        this.textContent = 'Read Less ▲';
      } else {
        expanded.classList.add('hidden');
        this.textContent = 'Read More ▼';
      }
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('span:last-child');
        
        if (answer.classList.contains('hidden')) {
          answer.classList.remove('hidden');
          icon.textContent = '−';
        } else {
          answer.classList.add('hidden');
          icon.textContent = '+';
        }
      });
    });

    // Chapter Modal
    const modal = document.getElementById('chapter-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    document.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const chapterId = this.dataset.chapter;
        const chapter = chapters[chapterId];
        
        modalTitle.textContent = `Chapter ${chapterId}: ${chapter.title}`;
        modalContent.innerHTML = `
          <p>${chapter.content}</p>
          <div class="mt-4 p-4 bg-black/30 rounded-lg">
            <h4 class="font-semibold mb-2 text-yellow-400">What you'll learn:</h4>
            <ul class="space-y-2 text-sm">
              <li>✓ Comprehensive theory and concepts</li>
              <li>✓ Practical exercises and examples</li>
              <li>✓ Real-world application techniques</li>
              <li>✓ Expert tips and best practices</li>
            </ul>
          </div>
        `;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    });

    document.getElementById('close-modal').addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });

    // Scroll Reveal Animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Buy Now button click handler
    document.querySelectorAll('.buy-now-btn, #hero-buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const config = window.elementSdk ? window.elementSdk.config : defaultConfig;
        const whatsappNumber = (config.whatsapp_number || defaultConfig.whatsapp_number).replace(/[^0-9]/g, '');
        const message = encodeURIComponent(`Hi! I want to purchase the Premium Digital Course for NPR ${config.sale_price || defaultConfig.sale_price}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      });
    });

    // Initialize UI
    updateUI(defaultConfig);
    updateCopies();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9d6f6c6774e89e7a',t:'MTc3MjYxMjAyNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script>
