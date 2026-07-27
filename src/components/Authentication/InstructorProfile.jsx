import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * InstructorProfile Component: Dedicated academic profile page featuring 
 * Mrs. Shahd Abulila's professional biography, experience, teaching philosophy, and contact details.
 */
export const InstructorProfile = () => {
  const navigate = useNavigate();

  return (
    <main className="profile-page font-sans">

      {/* Profile Hero */}
      <header className="profile-hero mt-6">
        <div className="w-36 h-36 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-4xl shadow-md border-4 border-white mb-5">
          👩‍🏫
        </div>
        <h1>Mrs. Shahd Abulila</h1>
        <p className="profile-title">Cambridge English Teacher | Curriculum Designer | Bilingual Educator (Arabic–English)</p>
        <p className="profile-specialisms">Building confident communicators and independent learners through purposeful English education.</p>
        <p className="profile-introduction">
          Mrs. Shahd Abulila is an experienced English Language Educator with over nine years of teaching experience across primary, secondary, and university-preparation levels. Her professional background includes Cambridge English instruction, curriculum design, differentiated learning, assessment development, and supporting multilingual learners in achieving academic success.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="profile-grid">

        {/* Professional Information */}
        <section className="profile-section">
          <h2>Professional Information</h2>
          <p className="text-gray-600 text-sm mb-4">
            She is passionate about helping learners develop into confident communicators, critical thinkers, and lifelong learners. Her approach combines purposeful language instruction with learner-centred practices designed to support students with different learning needs and backgrounds.
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Experience:</strong> Over nine years of English teaching experience</p>
            <p><strong>Teaching Levels:</strong> Primary, Secondary, University Preparation</p>
            <div>
              <strong>Professional Areas:</strong>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                <li>Cambridge English instruction</li>
                <li>English language teaching</li>
                <li>Curriculum design</li>
                <li>Differentiated learning</li>
                <li>Assessment development</li>
                <li>Multilingual learner support</li>
                <li>Academic English development</li>
                <li>Communication skills development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Areas of Expertise */}
        <section className="profile-section">
          <h2>Areas of Expertise</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            <li>
              <strong>English Language Education:</strong> Supporting learners in developing effective English language and communication skills.
            </li>
            <li>
              <strong>Cambridge English:</strong> Experience in Cambridge English instruction and educational preparation.
            </li>
            <li>
              <strong>Curriculum Design:</strong> Designing purposeful learning experiences and curriculum content aligned with learner needs.
            </li>
            <li>
              <strong>Differentiated Learning:</strong> Adapting learning approaches to support students with different abilities and educational backgrounds.
            </li>
            <li>
              <strong>Assessment Development:</strong> Supporting assessment practices designed to monitor and promote student learning.
            </li>
          </ul>
        </section>

        {/* Professional Experience & Approach */}
        <section className="profile-section profile-wide">
          <h2>Professional Approach</h2>
          <p className="text-sm text-gray-600 mb-4">
            Mrs. Shahd's professional approach is centred on learner-centred education, purposeful language development, differentiated instruction, academic progress, and building real-world communication confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
            <div className="bg-gray-50 p-3 rounded-lg border">
              <strong className="block text-gray-900 mb-1">Learner-Centred Education</strong>
              : Creating learning experiences that respond to students' individual needs and learning contexts.
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <strong className="block text-gray-900 mb-1">Purposeful Development</strong>
              : Helping learners develop English skills meaningful for academic and real-world communication.
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <strong className="block text-gray-900 mb-1">Confidence & Communication</strong>
              : Encouraging students to become confident users of English and effective communicators.
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="profile-section profile-wide">
          <h2>Teaching Philosophy</h2>
          <blockquote>
            "Every learner can make meaningful progress when learning is purposeful, supportive, and appropriately challenging."
          </blockquote>
          <p className="text-xs text-gray-600 mt-3 leading-relaxed">
            Mrs. Shahd believes that effective English education should go beyond the memorisation of language rules or preparation for examinations. It should help learners become confident communicators, critical thinkers, and lifelong learners.
          </p>
        </section>

        {/* Contact Details */}
        <section className="profile-section profile-wide">
          <h2>Contact Details</h2>
          <address className="text-sm text-gray-700 space-y-1">
            <p>📧 <a href="mailto:shahdabulila03@gmail.com">shahdabulila03@gmail.com</a></p>
            <p>📞 <a href="tel:+601111556245">+60 1111 556245</a></p>
            <p>📍 Kuala Lumpur, Malaysia</p>
          </address>
        </section>

      </div>

      {/* Return Action */}
      <div className="profile-footer">
        <button 
          onClick={() => navigate('/')}
          className="primary-button border-none cursor-pointer"
        >
          RETURN TO SECURE LOGIN
        </button>
      </div>

    </main>
  );
};

export default InstructorProfile;