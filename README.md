# Gryfn - AI-Powered Dyslexia Assessment Platform

Gryfn is an innovative web application that leverages artificial intelligence to assist in the assessment and diagnosis of dyslexia. The platform combines modern web technologies with advanced AI capabilities to provide a comprehensive assessment experience.

## Features

- **Multi-modal Assessment**: Combines various assessment methods including:
  - Phonetic analysis
  - Speech recognition
  - Eidetic memory testing
  - Comprehensive intake assessments

- **AI-Powered Analysis**: Utilizes advanced AI models to analyze assessment results and provide insights

- **User Management**: 
  - Account management system
  - Organization support for educational institutions
  - Badge system for achievements and progress tracking

## Technology Stack

### Backend
- Ruby on Rails 7.0
- PostgreSQL database
- Redis for caching and real-time features
- Google Cloud Speech-to-Text for voice recognition
- OpenAI integration for AI analysis

### Frontend
- React.js
- Material-UI components
- Stimulus.js for enhanced interactivity
- React Router for navigation
- Audio recording and playback capabilities

## Prerequisites

- Ruby 3.1.0
- Node.js and Yarn
- PostgreSQL
- Redis
- Google Cloud credentials
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bundle install
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Add required API keys and configuration

4. Set up the database:
   ```bash
   rails db:create db:migrate
   ```

5. Start the development server:
   ```bash
   ./bin/dev
   ```

## Development

The application uses a modern development setup with:
- Hot reloading for both Rails and JavaScript
- RSpec for testing
- Factory Bot for test data
- Capybara for system tests

## Testing

Run the test suite with:
```bash
rspec
```

## Deployment

The application is configured for deployment on Render, with configuration in `render.yaml`.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
