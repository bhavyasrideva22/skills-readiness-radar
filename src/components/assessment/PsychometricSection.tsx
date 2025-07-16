import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, ArrowRight, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PsychometricSectionProps {
  onComplete: (scores: number) => void;
}

const psychometricQuestions = [
  {
    category: "Interest Scale",
    questions: [
      {
        text: "I enjoy finding patterns and trends in data",
        type: "likert"
      },
      {
        text: "I'm naturally curious about what data can reveal about business performance",
        type: "likert"
      },
      {
        text: "I find satisfaction in creating visual representations of complex information",
        type: "likert"
      }
    ]
  },
  {
    category: "Personality Compatibility",
    questions: [
      {
        text: "I prefer working with structured, organized information rather than ambiguous concepts",
        type: "likert"
      },
      {
        text: "I am comfortable spending long periods focused on detailed analytical work",
        type: "likert"
      },
      {
        text: "I enjoy helping others understand complex information through clear explanations",
        type: "likert"
      }
    ]
  },
  {
    category: "Cognitive Style & Preferences",
    questions: [
      {
        text: "When solving problems, I prefer to break them down into smaller, logical steps",
        type: "likert"
      },
      {
        text: "I'm more interested in understanding 'what' the data shows than 'why' it might be happening",
        type: "likert"
      },
      {
        text: "I prefer working with facts and numbers over theories and concepts",
        type: "likert"
      }
    ]
  },
  {
    category: "Motivation Source",
    questions: [
      {
        text: "I'm motivated by the impact my analytical insights can have on business decisions",
        type: "likert"
      }
    ]
  }
];

export const PsychometricSection = ({ onComplete }: PsychometricSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const allQuestions = psychometricQuestions.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.category }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    const score = parseInt(currentAnswer);
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    } else {
      // Calculate final score
      const averageScore = newAnswers.reduce((sum, score) => sum + score, 0) / newAnswers.length;
      const normalizedScore = Math.round((averageScore - 1) * 25); // Convert 1-5 scale to 0-100
      onComplete(normalizedScore);
    }
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
            <Brain className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Psychological Fit Assessment</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Assess your intrinsic motivation, personality traits, and cognitive preferences for BI work
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
      </Card>

      <Card className="min-h-[400px]">
        <CardHeader>
          <div className="text-sm text-primary font-medium mb-2">
            {currentQuestion.category}
          </div>
          <CardTitle className="text-xl text-foreground leading-relaxed">
            {currentQuestion.text}
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

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleNext} 
              disabled={!currentAnswer}
              className="bg-primary hover:bg-primary-hover"
            >
              {currentQuestionIndex < allQuestions.length - 1 ? 'Next Question' : 'Complete Section'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <BarChart className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">What We're Measuring</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Interest Scale:</strong> Your intrinsic curiosity about data and visualization</li>
                <li>• <strong>Personality Match:</strong> Alignment with successful BI professionals</li>
                <li>• <strong>Cognitive Style:</strong> Analytical vs creative thinking preferences</li>
                <li>• <strong>Motivation:</strong> Internal drive vs external pressure factors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};