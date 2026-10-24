import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Bookmark, 
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';
import { ArticleItem } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface ArticlesSectionProps {
  articles: ArticleItem[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playKey();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="articles" className="py-24 relative border-t border-slate-800/80 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Engineering Writing & Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Deep Dives & RFCs
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Articles and post-mortems exploring memory optimization, distributed consensus, and high-performance database tuning.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            return (
              <div
                key={article.id}
                id={`article-card-${article.id}`}
                className="group p-6 rounded-xl bg-[#0F0F0F] border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 mb-3">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">{article.publication}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className="text-slate-400 hover:text-cyan-400"
                        title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2.5 leading-snug">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                </div>

                {/* Tags & Action */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={article.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Read Full Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
