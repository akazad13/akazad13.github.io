import React from 'react';
import { MessageSquareQuote, Star, Building2, UserCheck } from 'lucide-react';
import { TestimonialItem } from '../types/portfolio';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 relative border-t border-slate-800/80 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Peer Recommendations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Engineering Leaders Say
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Feedback and endorsements from VPs of Engineering, Principal Architects, and senior infrastructure teammates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              id={`testimonial-card-${test.id}`}
              className="p-6 rounded-xl bg-[#0F0F0F] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-cyan-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-cyan-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {test.avatarText}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">{test.name}</h4>
                  <p className="text-xs text-cyan-300 truncate">{test.role} • {test.company}</p>
                  <p className="text-[10px] text-slate-500 font-mono truncate">{test.relationship}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
