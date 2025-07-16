import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BarChart3, ArrowRight, Zap, Heart, Wrench, Brain, BookOpen, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WiscarAnalysisProps {
  onComplete: (scores: any) => void;
}

const wiscarDimensions = [
  {
    code: "W",
    dimension: "Will",
    icon: Zap,
    description: "Grit, perseverance, and consistency in learning",
    questions: [
      "I stick with challenging projects even when they become difficult",
      "I'm willing to put in extra hours to master new tools and concepts"
    ]
  },
  {
    code: "I", 
    dimension: "Interest",
    icon: Heart,
    description: "Curiosity and long-term relevance to your goals",
    questions: [
      "I find myself naturally drawn to understanding how businesses use data",
      "I enjoy exploring new ways to visualize and present information"
    ]
  },
  {
    code: "S",
    dimension: "Skill",
    icon: Wrench,
    description: "Current match to BI tools' core requirements",
    questions: [
      "I'm comfortable working with spreadsheets and basic formulas",
      "I can easily identify trends and patterns in data sets"
    ]
  },
  {
    code: "C",
    dimension: "Cognitive Readiness", 
    icon: Brain,
    description: "Pattern thinking and comprehension speed",
    questions: [
      "I can quickly understand complex business processes and requirements",
      "I enjoy breaking down complicated problems into smaller parts"
    ]
  },
  {
    code: "A",
    dimension: "Ability to Learn",
    icon: BookOpen,
    description: "Openness, reflection, and feedback acceptance",
    questions: [
      "I actively seek feedback to improve my work",
      "I'm comfortable learning new software tools and technologies"
    ]
  },
  {
    code: "R",
    dimension: "Real-World Alignment",
    icon: Target,
    description: "Career expectations vs actual role duties",
    questions: [
      "I understand that BI work involves both technical skills and business communication",
      "I'm interested in roles that bridge technology and business strategy"
    ]
  }
];

export const WiscarAnalysis = ({ onComplete }: WiscarAnalysisProps) => {
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<{[key: string]: number[]}>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const currentDimension = wiscarDimensions[currentDimensionIndex];
  const currentQuestion = currentDimension.questions[currentQuestionIndex];
  const totalQuestions = wiscarDimensions.reduce((sum, dim) => sum + dim.questions.length, 0);
  const completedQuestions = Object.values(dimensionScores).reduce((sum, scores) => sum + scores.length, 0) + currentQuestionIndex;
  const progress = (completedQuestions / totalQuestions) * 100;

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    const score = parseInt(currentAnswer);
    const dimensionKey = currentDimension.dimension.toLowerCase().replace(/\s+/g, '');
    
    // Add answer to current dimension
    const currentDimScores = dimensionScores[dimensionKey] || [];
    const updatedDimScores = [...currentDimScores, score];
    
    const newDimensionScores = {
      ...dimensionScores,
      [dimensionKey]: updatedDimScores
    };
    
    setDimensionScores(newDimensionScores);

    // Move to next question or dimension
    if (currentQuestionIndex < currentDimension.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentDimensionIndex < wiscarDimensions.length - 1) {
      setCurrentDimensionIndex(currentDimensionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Calculate final WISCAR scores
      const finalScores: any = {};
      
      wiscarDimensions.forEach(dimension => {
        const key = dimension.dimension.toLowerCase().replace(/\s+/g, '');
        const scores = newDimensionScores[key] || [];
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        finalScores[key] = Math.round((avgScore - 1) * 25); // Convert 1-5 to 0-100
      });
      
      onComplete(finalScores);
    }
    
    setCurrentAnswer("");
  };

  const likertOptions = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">WISCAR Framework Analysis</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Comprehensive evaluation across six key dimensions for BI career success
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {completedQuestions + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
      </Card>

      <Card className="min-h-[500px]">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <currentDimension.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {currentDimension.code} - {currentDimension.dimension}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentDimension.description}
              </div>
            </div>
          </div>
          <CardTitle className="text-xl text-foreground leading-relaxed">
            {currentQuestion}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-3">
            {likertOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 text-foreground cursor-pointer font-medium"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-muted-foreground">
              {currentDimension.dimension} - Question {currentQuestionIndex + 1} of {currentDimension.questions.length}
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!currentAnswer}
              className="bg-primary hover:bg-primary-hover"
            >
              {currentDimensionIndex === wiscarDimensions.length - 1 && currentQuestionIndex === currentDimension.questions.length - 1 
                ? 'Complete Assessment' 
                : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* WISCAR Overview */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">WISCAR Framework Dimensions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wiscarDimensions.map((dimension, index) => {
              const Icon = dimension.icon;
              const isCompleted = Object.keys(dimensionScores).includes(dimension.dimension.toLowerCase().replace(/\s+/g, ''));
              const isCurrent = index === currentDimensionIndex;
              
              return (
                <div 
                  key={dimension.code}
                  className={`p-3 rounded-lg border ${
                    isCurrent ? 'border-primary bg-primary/5' : 
                    isCompleted ? 'border-success bg-success/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`} />
                    <span className="font-medium text-sm text-foreground">
                      {dimension.code} - {dimension.dimension}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{dimension.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};