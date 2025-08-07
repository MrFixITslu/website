// Vision79 AI Business Expert Chatbot
class Vision79Chatbot {
    constructor() {
        this.messages = [];
        this.currentTopic = null;
        this.userContext = {};
        this.isTyping = false;
        
        // Initialize DOM elements
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        
        // Bind event listeners
        this.bindEvents();
        
        // Start the conversation
        this.initializeChat();
    }
    
    bindEvents() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Enter key press
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + 'px';
        });
        
        // Topic buttons
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const topic = btn.dataset.topic;
                this.handleTopicSelection(topic);
            });
        });
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const suggestion = btn.dataset.suggestion;
                this.chatInput.value = suggestion;
                this.sendMessage();
            });
        });
    }
    
    initializeChat() {
        // Welcome message
        setTimeout(() => {
            this.addBotMessage(
                "Hello! I'm your AI Business Expert from Vision79. 👋\n\n" +
                "I can help you with:\n" +
                "• AI solutions and consulting\n" +
                "• SIWM (Smart Inventory & Warehouse Management)\n" +
                "• Digital transformation strategies\n" +
                "• Technology optimization\n\n" +
                "What would you like to explore today?",
                [
                    "Tell me about SIWM",
                    "AI consulting services",
                    "Pricing packages",
                    "Case studies"
                ]
            );
        }, 500);
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addUserMessage(message);
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and generate response
        const response = await this.processMessage(message);
        
        // Hide typing indicator and show response
        this.hideTypingIndicator();
        this.addBotMessage(response.text, response.quickResponses);
    }
    
    async processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Analyze message intent
        const intent = this.analyzeIntent(lowerMessage);
        
        // Generate appropriate response based on intent
        switch (intent) {
            case 'greeting':
                return this.handleGreeting();
            case 'siwm':
                return this.handleSIWM();
            case 'ai_solutions':
                return this.handleAISolutions();
            case 'consulting':
                return this.handleConsulting();
            case 'pricing':
                return this.handlePricing();
            case 'case_studies':
                return this.handleCaseStudies();
            case 'inventory':
                return this.handleInventoryManagement();
            case 'contact':
                return this.handleContact();
            case 'business_analysis':
                return this.handleBusinessAnalysis(message);
            default:
                return this.handleGeneralInquiry(message);
        }
    }
    
    analyzeIntent(message) {
        const siwmKeywords = ['siwm', 'warehouse', 'inventory', 'stock', 'shipping', 'logistics'];
        const aiKeywords = ['ai', 'artificial intelligence', 'automation', 'machine learning', 'predictive'];
        const consultingKeywords = ['consulting', 'consultant', 'strategy', 'roadmap', 'assessment'];
        const pricingKeywords = ['price', 'cost', 'package', 'pricing', 'quote', 'budget'];
        const caseKeywords = ['case study', 'success story', 'example', 'client', 'result'];
        const inventoryKeywords = ['inventory management', 'stock management', 'tracking', 'warehouse'];
        const contactKeywords = ['contact', 'email', 'phone', 'call', 'reach'];
        const greetingKeywords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon'];
        
        if (greetingKeywords.some(keyword => message.includes(keyword))) return 'greeting';
        if (siwmKeywords.some(keyword => message.includes(keyword))) return 'siwm';
        if (aiKeywords.some(keyword => message.includes(keyword))) return 'ai_solutions';
        if (consultingKeywords.some(keyword => message.includes(keyword))) return 'consulting';
        if (pricingKeywords.some(keyword => message.includes(keyword))) return 'pricing';
        if (caseKeywords.some(keyword => message.includes(keyword))) return 'case_studies';
        if (inventoryKeywords.some(keyword => message.includes(keyword))) return 'inventory';
        if (contactKeywords.some(keyword => message.includes(keyword))) return 'contact';
        
        // Check for business analysis questions
        if (message.includes('how') || message.includes('what') || message.includes('challenge') || 
            message.includes('problem') || message.includes('improve') || message.includes('optimize')) {
            return 'business_analysis';
        }
        
        return 'general';
    }
    
    handleGreeting() {
        return {
            text: "Hello! Great to meet you! I'm here to help you explore how Vision79's AI solutions can transform your business operations.\n\n" +
                  "I specialize in:\n" +
                  "• SIWM (Smart Inventory & Warehouse Management)\n" +
                  "• Custom AI development and automation\n" +
                  "• Digital transformation consulting\n" +
                  "• Technology optimization\n\n" +
                  "What aspect of your business would you like to discuss?",
            quickResponses: [
                "Tell me about SIWM",
                "AI consulting services",
                "Digital transformation",
                "Pricing information"
            ]
        };
    }
    
    handleSIWM() {
        return {
            text: "**SIWM (Smart Inventory & Warehouse Management)** is our flagship AI-powered solution! 🚀\n\n" +
                  "**Key Features:**\n" +
                  "• Real-time inventory tracking across all locations\n" +
                  "• Automated stock level management with predictive alerts\n" +
                  "• Intelligent shipping optimization and route planning\n" +
                  "• Mobile app for warehouse staff and managers\n" +
                  "• Advanced analytics and reporting dashboard\n" +
                  "• Integration with existing ERP and e-commerce systems\n\n" +
                  "**Business Benefits:**\n" +
                  "• Reduce stockouts by 85%\n" +
                  "• Cut inventory costs by 30%\n" +
                  "• Improve shipping accuracy to 99.5%\n" +
                  "• Save 15+ hours per week on manual tracking\n\n" +
                  "Would you like to know more about implementation or see a demo?",
            quickResponses: [
                "SIWM implementation process",
                "SIWM pricing",
                "SIWM case studies",
                "Request demo"
            ]
        };
    }
    
    handleAISolutions() {
        return {
            text: "**Vision79 AI Solutions** - We democratize AI technology! 🤖\n\n" +
                  "**Our AI Services:**\n" +
                  "• **Custom AI Development** - Tailored solutions for your specific needs\n" +
                  "• **Process Automation** - Eliminate repetitive tasks with intelligent workflows\n" +
                  "• **Predictive Analytics** - Forecast trends and optimize decision-making\n" +
                  "• **Data Integration** - Connect all your systems for unified insights\n" +
                  "• **Machine Learning Models** - Learn from your data to improve operations\n\n" +
                  "**Industries We Serve:**\n" +
                  "• Retail & E-commerce\n" +
                  "• Manufacturing & Logistics\n" +
                  "• Healthcare & Pharmaceuticals\n" +
                  "• Financial Services\n" +
                  "• Hospitality & Tourism\n\n" +
                  "What type of AI solution are you looking for?",
            quickResponses: [
                "Custom AI development",
                "Process automation",
                "Predictive analytics",
                "AI consulting"
            ]
        };
    }
    
    handleConsulting() {
        return {
            text: "**Vision79 AI Consulting** - Your strategic technology partner! 💼\n\n" +
                  "**Our Consulting Approach:**\n" +
                  "1. **Technology Assessment** - Analyze your current systems and identify opportunities\n" +
                  "2. **AI Strategy Development** - Create a roadmap for digital transformation\n" +
                  "3. **Implementation Planning** - Design phased rollouts that minimize disruption\n" +
                  "4. **Change Management** - Train your team and ensure successful adoption\n" +
                  "5. **Ongoing Optimization** - Continuous improvement and system enhancements\n\n" +
                  "**Consulting Packages:**\n" +
                  "• **Discovery Session** (Free) - 1-hour technology assessment\n" +
                  "• **Strategy Workshop** - Half-day intensive planning session\n" +
                  "• **Implementation Support** - Full project management and execution\n" +
                  "• **Ongoing Partnership** - Monthly consulting and optimization\n\n" +
                  "Would you like to schedule a free discovery session?",
            quickResponses: [
                "Schedule free consultation",
                "Strategy workshop details",
                "Implementation process",
                "Consulting pricing"
            ]
        };
    }
    
    handlePricing() {
        return {
            text: "**Vision79 Pricing** - Transparent, value-driven packages! 💰\n\n" +
                  "**SIWM System:**\n" +
                  "• **Starter** - $299/month (Up to 1,000 SKUs)\n" +
                  "• **Professional** - $599/month (Up to 10,000 SKUs)\n" +
                  "• **Enterprise** - Custom pricing (Unlimited SKUs)\n\n" +
                  "**AI Consulting:**\n" +
                  "• **Discovery Session** - FREE\n" +
                  "• **Strategy Workshop** - $1,500 (Half-day)\n" +
                  "• **Implementation Support** - $150/hour\n" +
                  "• **Monthly Partnership** - $2,500/month\n\n" +
                  "**Custom AI Development:**\n" +
                  "• **Project-based** - Starting at $15,000\n" +
                  "• **Hourly Rate** - $150/hour\n" +
                  "• **Maintenance** - 20% of project cost annually\n\n" +
                  "All packages include:\n" +
                  "• Implementation support\n" +
                  "• Training and documentation\n" +
                  "• 30-day money-back guarantee\n" +
                  "• Ongoing technical support\n\n" +
                  "Would you like a custom quote for your specific needs?",
            quickResponses: [
                "Get custom quote",
                "SIWM pricing details",
                "Consulting packages",
                "Schedule consultation"
            ]
        };
    }
    
    handleCaseStudies() {
        return {
            text: "**Vision79 Success Stories** - Real results from real businesses! 📈\n\n" +
                  "**Case Study 1: Caribbean Retail Chain**\n" +
                  "• **Challenge:** Manual inventory tracking across 5 locations\n" +
                  "• **Solution:** SIWM implementation with mobile app\n" +
                  "• **Results:** 40% reduction in stockouts, 25% cost savings\n\n" +
                  "**Case Study 2: Manufacturing Company**\n" +
                  "• **Challenge:** Inefficient production scheduling\n" +
                  "• **Solution:** Custom AI scheduling system\n" +
                  "• **Results:** 30% increase in production efficiency\n\n" +
                  "**Case Study 3: E-commerce Business**\n" +
                  "• **Challenge:** Shipping delays and customer complaints\n" +
                  "• **Solution:** AI-powered shipping optimization\n" +
                  "• **Results:** 99.5% shipping accuracy, 50% faster delivery\n\n" +
                  "**Case Study 4: Healthcare Facility**\n" +
                  "• **Challenge:** Manual patient scheduling and resource allocation\n" +
                  "• **Solution:** AI-driven scheduling and resource management\n" +
                  "• **Results:** 35% reduction in wait times, improved patient satisfaction\n\n" +
                  "Would you like to discuss how similar solutions could benefit your business?",
            quickResponses: [
                "Similar solution for my business",
                "More case studies",
                "Schedule consultation",
                "Request demo"
            ]
        };
    }
    
    handleInventoryManagement() {
        return {
            text: "**Inventory Management Challenges** - Let's identify your pain points! 🔍\n\n" +
                  "**Common Inventory Issues:**\n" +
                  "• Manual tracking leading to errors and delays\n" +
                  "• Stockouts causing lost sales\n" +
                  "• Overstocking tying up capital\n" +
                  "• Lack of real-time visibility\n" +
                  "• Inefficient warehouse operations\n" +
                  "• Poor demand forecasting\n\n" +
                  "**How SIWM Solves These:**\n" +
                  "• **Real-time Tracking** - Know exactly what you have, where it is\n" +
                  "• **Predictive Alerts** - Get notified before stockouts occur\n" +
                  "• **Automated Reordering** - Set smart reorder points\n" +
                  "• **Warehouse Optimization** - AI-powered layout and picking routes\n" +
                  "• **Demand Forecasting** - Machine learning predicts future needs\n\n" +
                  "**Quick Questions to Assess Your Needs:**\n" +
                  "1. How do you currently track inventory?\n" +
                  "2. How often do you experience stockouts?\n" +
                  "3. How much time does your team spend on manual counts?\n" +
                  "4. Do you have multiple locations or warehouses?\n\n" +
                  "Tell me about your current inventory challenges!",
            quickResponses: [
                "Manual tracking issues",
                "Stockout problems",
                "Multiple locations",
                "Warehouse optimization"
            ]
        };
    }
    
    handleContact() {
        return {
            text: "**Get in Touch with Vision79** - We're here to help! 📞\n\n" +
                  "**Contact Information:**\n" +
                  "• **Email:** vision79slu@gmail.com\n" +
                  "• **Phone:** +1 (758) 726-0035\n" +
                  "• **Location:** Gros-Islet, St. Lucia\n" +
                  "• **Hours:** Monday-Friday, 9:00 AM - 6:00 PM AST\n\n" +
                  "**Ways to Connect:**\n" +
                  "• **Free Consultation** - Schedule a 1-hour discovery session\n" +
                  "• **Demo Request** - See SIWM in action\n" +
                  "• **Quote Request** - Get a custom proposal\n" +
                  "• **Partnership Inquiry** - Discuss ongoing support\n\n" +
                  "**Response Time:**\n" +
                  "• Email: Within 2 hours during business hours\n" +
                  "• Phone: Immediate during business hours\n" +
                  "• WhatsApp: Available for quick questions\n\n" +
                  "What's the best way to reach you?",
            quickResponses: [
                "Schedule consultation",
                "Request demo",
                "Get quote",
                "Call now"
            ]
        };
    }
    
    handleBusinessAnalysis(message) {
        // Extract business context from the message
        const businessContext = this.extractBusinessContext(message);
        
        return {
            text: `**Business Analysis** - Let me help you identify opportunities! 🔍\n\n` +
                  `Based on your question about "${message}", here are some key areas to explore:\n\n` +
                  `**Potential AI Solutions:**\n` +
                  `• **Process Automation** - Eliminate manual, repetitive tasks\n` +
                  `• **Data Analytics** - Gain insights from your existing data\n` +
                  `• **Predictive Modeling** - Forecast trends and optimize decisions\n` +
                  `• **System Integration** - Connect your tools for better workflow\n\n` +
                  `**Next Steps:**\n` +
                  `1. **Free Assessment** - Let us analyze your current processes\n` +
                  `2. **ROI Analysis** - Calculate potential savings and improvements\n` +
                  `3. **Implementation Plan** - Design a phased approach\n` +
                  `4. **Proof of Concept** - Start with a small pilot project\n\n` +
                  `Would you like to schedule a free business assessment to explore these opportunities?`,
            quickResponses: [
                "Schedule assessment",
                "ROI analysis",
                "Implementation plan",
                "Proof of concept"
            ]
        };
    }
    
    handleGeneralInquiry(message) {
        return {
            text: "**Great Question!** - Let me help you find the right solution! 🤔\n\n" +
                  "I understand you're asking about \"" + message + "\". Let me break this down:\n\n" +
                  "**How Vision79 Can Help:**\n" +
                  "• **Technology Assessment** - We'll analyze your current setup\n" +
                  "• **Solution Matching** - Find the right AI tools for your needs\n" +
                  "• **Implementation Support** - Guide you through the process\n" +
                  "• **Ongoing Optimization** - Continuous improvement and support\n\n" +
                  "**To Better Assist You:**\n" +
                  "Could you tell me more about:\n" +
                  "• Your current business challenges\n" +
                  "• The specific problem you're trying to solve\n" +
                  "• Your industry and business size\n" +
                  "• Your technology comfort level\n\n" +
                  "This will help me provide more targeted recommendations!",
            quickResponses: [
                "Business challenges",
                "Specific problems",
                "Industry details",
                "Technology needs"
            ]
        };
    }
    
    extractBusinessContext(message) {
        // Simple keyword extraction for business context
        const contexts = {
            'inventory': 'inventory management',
            'warehouse': 'warehouse operations',
            'shipping': 'logistics and shipping',
            'customer': 'customer service',
            'sales': 'sales and marketing',
            'finance': 'financial management',
            'hr': 'human resources',
            'production': 'manufacturing and production'
        };
        
        for (const [keyword, context] of Object.entries(contexts)) {
            if (message.toLowerCase().includes(keyword)) {
                return context;
            }
        }
        
        return 'general business operations';
    }
    
    handleTopicSelection(topic) {
        const topicMessages = {
            'inventory': 'Tell me about your current inventory management challenges. How do you track stock levels?',
            'siwm': 'I\'d love to tell you about our SIWM system! What aspects interest you most?',
            'ai-solutions': 'Great choice! What type of AI solution are you looking for?',
            'consulting': 'Perfect! Let\'s discuss your consulting needs. What\'s your current technology situation?',
            'pricing': 'I\'d be happy to discuss our pricing packages. What\'s your budget range?',
            'case-studies': 'Excellent! I have several success stories to share. What industry are you in?'
        };
        
        this.chatInput.value = topicMessages[topic] || 'Tell me more about this topic.';
        this.sendMessage();
    }
    
    addUserMessage(text) {
        const message = {
            type: 'user',
            text: text,
            timestamp: new Date()
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    
    addBotMessage(text, quickResponses = []) {
        const message = {
            type: 'bot',
            text: text,
            timestamp: new Date(),
            quickResponses: quickResponses
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    
    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = message.type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const text = document.createElement('div');
        text.className = 'message-text';
        text.innerHTML = this.formatMessage(message.text);
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        content.appendChild(text);
        content.appendChild(time);
        
        // Add quick response buttons for bot messages
        if (message.type === 'bot' && message.quickResponses && message.quickResponses.length > 0) {
            const quickResponses = document.createElement('div');
            quickResponses.className = 'quick-responses';
            
            message.quickResponses.forEach(response => {
                const button = document.createElement('button');
                button.className = 'quick-response-btn';
                button.textContent = response;
                button.addEventListener('click', () => {
                    this.chatInput.value = response;
                    this.sendMessage();
                });
                quickResponses.appendChild(button);
            });
            
            content.appendChild(quickResponses);
        }
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        
        this.chatMessages.appendChild(messageElement);
    }
    
    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '• ');
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        this.sendButton.disabled = true;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot typing-indicator';
        typingElement.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        typingElement.appendChild(avatar);
        typingElement.appendChild(content);
        
        this.chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        this.sendButton.disabled = false;
        
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Vision79Chatbot();
});
