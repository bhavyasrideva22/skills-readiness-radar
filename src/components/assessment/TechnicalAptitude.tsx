import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Target, ArrowRight, Code, Calculator, Database, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TechnicalAptitudeProps {
  onComplete: (scores: number) => void;
}

const technicalQuestions = [
  {
    category: "Logical Reasoning",
    icon: Code,
    questions: [
      {
        text: "If Sales = 100 and Growth Rate = 15%, what would be the projected sales for next year?",
        options: [
          "115",
          "85", 
          "150",
          "100.15"
        ],
        correct: 0
      },
      {
        text: "In a dashboard, if you want to show data for 'Current Month' vs 'Previous Month', which filter logic makes most sense?",
        options: [
          "Date >= TODAY() AND Date < LAST_MONTH()",
          "Date = MONTH(TODAY()) OR Date = MONTH(TODAY())-1", 
          "Date >= STARTOFMONTH(TODAY()) OR Date >= STARTOFMONTH(DATEADD(MONTH,-1,TODAY()))",
          "Date BETWEEN CURRENT_MONTH AND PREVIOUS_MONTH"
        ],
        correct: 2
      }
    ]
  },
  {
    category: "Numerical Aptitude", 
    icon: Calculator,
    questions: [
      {
        text: "A company's revenue increased from $500K to $650K. What is the percentage increase?",
        options: [
          "30%",
          "25%",
          "20%", 
          "35%"
        ],
        correct: 0
      },
      {
        text: "If you have 1000 customers and want to show the top 10% in a chart, how many customers would that be?",
        options: [
          "10",
          "100",
          "50",
          "90"
        ],
        correct: 1
      }
    ]
  },
  {
    category: "Data Literacy",
    icon: Database,
    questions: [
      {
        text: "Which chart type is BEST for showing how a value changes over time?",
        options: [
          "Pie Chart",
          "Bar Chart",
          "Line Chart",
          "Scatter Plot"
        ],
        correct: 2
      },
      {
        text: "In a dataset with columns: CustomerID, OrderDate, Product, Quantity, Revenue - which would be the best 'primary key'?",
        options: [
          "Product",
          "OrderDate", 
          "CustomerID + OrderDate + Product",
          "Revenue"
        ],
        correct: 2
      }
    ]
  },
  {
    category: "BI Tool Concepts",
    icon: BarChart,
    questions: [
      {
        text: "What is a 'slicer' in Power BI/Tableau used for?",
        options: [
          "To cut data into smaller files",
          "To filter data interactively in dashboards",
          "To slice charts into segments", 
          "To remove unwanted columns"
        ],
        correct: 1
      },
      {
        text: "When creating a dashboard, what should you prioritize?",
        options: [
          "Using as many colors as possible",
          "Including every available metric",
          "Clear visual hierarchy and user experience",
          "Complex animations and effects"
        ],
        correct: 2
      }
    ]
  }
];

export const TechnicalAptitude = ({ onComplete }: TechnicalAptitudeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const allQuestions = technicalQuestions.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.category, icon: category.icon }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    const answerIndex = parseInt(currentAnswer);
    const isCorrect = answerIndex === currentQuestion.correct ? 1 : 0;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    } else {
      // Calculate final score
      const correctAnswers = newAnswers.reduce((sum, score) => sum + score, 0);
      const percentageScore = Math.round((correctAnswers / newAnswers.length) * 100);
      onComplete(percentageScore);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Technical Aptitude Assessment</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Test your analytical thinking, numerical reasoning, and BI concept understanding
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

      <Card className="min-h-[500px]">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <currentQuestion.icon className="h-5 w-5 text-primary" />
            <div className="text-sm text-primary font-medium">
              {currentQuestion.category}
            </div>
          </div>
          <CardTitle className="text-xl text-foreground leading-relaxed">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={index.toString()} />
                <Label 
                  htmlFor={index.toString()} 
                  className="flex-1 text-foreground cursor-pointer font-medium"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleNext} 
              disabled={currentAnswer === ""}
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
              <h3 className="font-semibold text-foreground mb-2">Assessment Areas</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong>Logical Reasoning:</strong> Pattern-based thinking and if/else logic
                </div>
                <div>
                  <strong>Numerical Aptitude:</strong> Percentage calculations, data interpretation
                </div>
                <div>
                  <strong>Data Literacy:</strong> Understanding charts, datasets, and KPIs
                </div>
                <div>
                  <strong>BI Concepts:</strong> Dashboard design and tool functionality
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};