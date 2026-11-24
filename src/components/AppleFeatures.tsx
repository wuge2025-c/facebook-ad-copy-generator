import React, { useEffect, useRef, useState } from 'react';

interface AppleFeaturesProps {
  featureImages: Record<string, string | null>;
  onRegenerateAll: () => Promise<void>;
}

export const AppleFeatures: React.FC<AppleFeaturesProps> = ({ featureImages: _featureImages, onRegenerateAll: _onRegenerateAll }) => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 在挂载时，预先将首屏内的卡片标记为可见，避免刷新时出现突兀的进场动画
    const initiallyVisible = new Set<number>();
    sectionRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      // 只要有 20% 以上在视口内，就认为首屏可见
      const elementHeight = rect.height || 1;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      if (visibleHeight / elementHeight >= 0.2) {
        initiallyVisible.add(idx);
      }
    });
    if (initiallyVisible.size > 0) {
      setVisibleSections(prev => new Set([...prev, ...Array.from(initiallyVisible)]));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '🤖',
      title: 'AI 智能生成',
      subtitle: '基于DeepSeek大模型',
      description: '先进的人工智能技术，深度理解产品特性，自动生成高转化率的广告文案，让每一个字都精准触达用户心理。',
      details: ['智能语义分析', '情感识别技术', '转化率优化', '实时学习能力'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🌍',
      title: '全球本土化',
      subtitle: '90+ 国家地区支持',
      description: '覆盖全球主要市场，精准适配当地语言、文化和消费习惯，让您的产品在任何地区都能获得本土用户的认同。',
      details: ['多语言支持', '文化适配', '本土表达', '地区优化'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🎨',
      title: '多风格模板',
      subtitle: '8种文案风格',
      description: '提供丰富的文案风格选择，从专业严谨到轻松幽默，满足不同产品和营销场景的个性化需求。',
      details: ['风格多样化', '场景适配', '个性定制', '灵活搭配'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: '智能优化',
      subtitle: 'Facebook政策合规',
      description: '自动检测敏感词汇，智能规避政策风险，确保生成的文案完全符合Facebook广告投放标准。',
      details: ['政策检测', '风险规避', '合规建议', '自动优化'],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="features" className="py-8 lg:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            重新定义
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 文案创作</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 leading-relaxed sm:text-lg">
            集成最先进的AI技术，为您的每一次营销活动提供精准、高效、个性化的文案解决方案
          </p>
        </div>

        {/* Single Row Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              data-index={index}
              className="relative h-full"
            >
              <div
                className={`h-full transition-all duration-1000 ${
                  visibleSections.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Feature Card - No Image */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full hover:shadow-xl hover:border-gray-200 transition-all duration-300 group flex flex-col">
                  {/* Icon/Title/Description wrapper with fixed min-height on large screens to align details across cards */}
                  <div className="mb-4 lg:min-h-[220px]">
                    {/* Icon and Title */}
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl md:text-5xl shadow-lg mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.subtitle}</p>
                    </div>
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => {
                      // 使用内联 delay，保持与其他模块一致的进场节奏（纵向位移）
                      const delayMs = (index * 150) + (detailIndex * 120);
                      return (
                        <div
                          key={detailIndex}
                          style={{ transitionDelay: `${delayMs}ms` }}
                          className={`flex items-center space-x-2 transition-all duration-700 ${
                            visibleSections.has(index)
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2'
                          }`}
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full flex-shrink-0`}></div>
                          <span className="text-gray-700 font-medium text-xs">{detail}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
