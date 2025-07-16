import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart3, Users, TrendingUp, ChevronRight, BookOpen, Brain, Target, CheckCircle } from "lucide-react";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { PsychometricSection } from "@/components/assessment/PsychometricSection";
import { TechnicalAptitude } from "@/components/assessment/TechnicalAptitude";
import { WiscarAnalysis } from "@/components/assessment/WiscarAnalysis";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(20);
  const [scores, setScores] = useState({
    psychological: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      reality: 0
    }
  });

  const sections = [
    { id: 'intro', label: 'Introduction', icon: BookOpen, active: true },
    { id: 'psychological', label: 'Psychological Fit', icon: Brain },
    { id: 'technical', label: 'Technical Aptitude', icon: Target },
    { id: 'wiscar', label: 'WISCAR Analysis', icon: BarChart3 },
    { id: 'results', label: 'Your Results', icon: TrendingUp }
  ];

  const handleSectionComplete = (sectionScores: any) => {
    if (currentSection === 1) {
      setScores(prev => ({ ...prev, psychological: sectionScores }));
      setProgress(40);
    } else if (currentSection === 2) {
      setScores(prev => ({ ...prev, technical: sectionScores }));
      setProgress(60);
    } else if (currentSection === 3) {
      setScores(prev => ({ ...prev, wiscar: sectionScores }));
      setProgress(80);
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      if (currentSection === 3) {
        setProgress(100);
      }
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return <AssessmentIntro onStart={() => handleSectionComplete({})} />;
      case 1:
        return <PsychometricSection onComplete={handleSectionComplete} />;
      case 2:
        return <TechnicalAptitude onComplete={handleSectionComplete} />;
      case 3:
        return <WiscarAnalysis onComplete={handleSectionComplete} />;
      case 4:
        return <AssessmentResults scores={scores} />;
      default:
        return <AssessmentIntro onStart={() => handleSectionComplete({})} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Is Power BI & Tableau the Right Career Fit for You?
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive Career Assessment & Guidance
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-sm font-medium text-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full max-w-md mx-auto mt-2" />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === currentSection;
            const isCompleted = index < currentSection;
            const isDisabled = index > currentSection;

            return (
              <div
                key={section.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : isCompleted
                    ? 'bg-success text-success-foreground border-success'
                    : isDisabled
                    ? 'bg-muted text-muted-foreground border-border cursor-not-allowed'
                    : 'bg-card text-card-foreground border-border hover:bg-secondary'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="text-sm font-medium hidden sm:inline">
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="animate-fade-in">
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

export default Index;
