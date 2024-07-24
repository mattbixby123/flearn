import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <h1>Flash Learn</h1>
      </header>
      <main>
        <section className="introduction">
          <p>
            Welcome to Flash Learn, your ultimate platform for efficient and 
            effective learning through digital flashcards. Create, study, and 
            master any subject with our intuitive flashcard system designed to 
            boost your memory retention and learning speed.
          </p>
        </section>
        {/* You can add more sections here as needed */}
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>Create custom flashcard decks</li>
            <li>Study with repetition</li>
            <li>Track your progress</li>
            <li>Share decks with friends</li>
            <li>Accomplish all of your goals</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default HomePage;