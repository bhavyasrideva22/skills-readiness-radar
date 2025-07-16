import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  BarChart3, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Award,
  BookOpen,
  Users,
  Lightbulb,
  ArrowRight
} from "lucide-react";

interface AssessmentResultsProps {
  scores: {
    psychological: number;
    technical: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      reality: number;
    };
  };
}

export const AssessmentResults = ({ scores }: AssessmentResultsProps) => {
  // Calculate overall confidence score
  const wiscarAverage = Object.values(scores.wiscar).reduce((sum, score) => sum + score, 0) / 6;
  const overallScore = Math.round((scores.psychological + scores.technical + wiscarAverage) / 3);
  
  const getRecommendation = () => {
    if (overallScore >= 75) return "Yes";
    if (overallScore >= 50) return "Maybe";
    return "No";
  };

  const getRecommendationColor = () => {
    const rec = getRecommendation();
    if (rec === "Yes") return "text-success";
    if (rec === "Maybe") return "text-warning";
    return "text-destructive";
  };

  const getRecommendationIcon = () => {
    const rec = getRecommendation();
    if (rec === "Yes") return CheckCircle;
    if (rec === "Maybe") return AlertCircle;
    return XCircle;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-success";
    if (score >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const careerPaths = [
    { role: "BI Analyst", match: Math.max(60, overallScore - 10), description: "Builds dashboards, extracts KPIs, advises teams" },
    { role: "Data Analyst", match: Math.max(55, overallScore - 15), description: "Analyzes trends, answers questions with data" },
    { role: "Data Visualization Specialist", match: Math.max(70, overallScore), description: "Designs compelling dashboards and reports" },
    { role: "Operations Analyst", match: Math.max(50, overallScore - 20), description: "Uses BI to improve workflows and efficiencies" },
    { role: "Self-Service BI Developer", match: Math.max(65, overallScore - 5), description: "Supports teams in creating their own reports" }
  ];

  const learningPath = [
    { level: "Beginner", topics: "Power BI Desktop, Tableau Basics, KPIs", resources: "Microsoft Learn, Tableau Public" },
    { level: "Intermediate", topics: "DAX, calculated fields, data blending", resources: "Coursera, Udemy, YouTube" },
    { level: "Advanced", topics: "Advanced dashboards, certifications", resources: "DA-100, Tableau Desktop Specialist" }
  ];

  const RecommendationIcon = getRecommendationIcon();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Main Results Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl text-foreground">Your Assessment Results</CardTitle>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <RecommendationIcon className={`h-12 w-12 ${getRecommendationColor()}`} />
            <div>
              <div className="text-4xl font-bold text-foreground">{overallScore}%</div>
              <div className="text-lg text-muted-foreground">Confidence Score</div>
            </div>
          </div>
          <div className="text-center">
            <Badge variant="outline" className={`text-lg px-4 py-2 ${getRecommendationColor()} border-current`}>
              Recommendation: {getRecommendation()}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-xl">Psychological Fit</CardTitle>
            <div className={`text-3xl font-bold ${getScoreColor(scores.psychological)}`}>
              {scores.psychological}%
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={scores.psychological} className="mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Your personality and motivation alignment with BI roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-xl">Technical Readiness</CardTitle>
            <div className={`text-3xl font-bold ${getScoreColor(scores.technical)}`}>
              {scores.technical}%
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={scores.technical} className="mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Your current analytical and technical foundation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-xl">WISCAR Analysis</CardTitle>
            <div className={`text-3xl font-bold ${getScoreColor(wiscarAverage)}`}>
              {Math.round(wiscarAverage)}%
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={wiscarAverage} className="mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Comprehensive readiness across six dimensions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">WISCAR Framework Breakdown</CardTitle>
          <CardDescription>Your scores across the six key dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(scores.wiscar).map(([key, score]) => {
              const labels = {
                will: "Will (Persistence)",
                interest: "Interest (Curiosity)", 
                skill: "Skill (Current Ability)",
                cognitive: "Cognitive (Thinking)",
                ability: "Ability (Learning)",
                reality: "Reality (Alignment)"
              };
              
              return (
                <div key={key} className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground capitalize">
                      {labels[key as keyof typeof labels]}
                    </span>
                    <span className={`font-bold ${getScoreColor(score)}`}>
                      {score}%
                    </span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Recommended Career Paths</CardTitle>
          </div>
          <CardDescription>Based on your assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerPaths.map((career, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{career.role}</h4>
                    <p className="text-sm text-muted-foreground">{career.description}</p>
                  </div>
                  <Badge variant="outline" className={getScoreColor(career.match)}>
                    {career.match}% Match
                  </Badge>
                </div>
                <Progress value={career.match} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Recommended Learning Path</CardTitle>
          </div>
          <CardDescription>Step-by-step guide to build your BI skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((level, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-foreground">{level.level}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Topics:</strong> {level.topics}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Resources:</strong> {level.resources}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Next Steps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getRecommendation() === "Yes" && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-semibold text-success mb-2">Recommended Actions:</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Begin with Power BI Desktop and Microsoft Learn modules</li>
                  <li>• Join Makeover Monday for Tableau practice</li>
                  <li>• Start building a portfolio of data visualizations</li>
                  <li>• Consider pursuing Microsoft Power BI certification</li>
                </ul>
              </div>
            )}
            
            {getRecommendation() === "Maybe" && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-semibold text-warning mb-2">Suggested Preparation:</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Strengthen Excel skills with advanced formulas and pivot tables</li>
                  <li>• Take an introductory data analysis course</li>
                  <li>• Practice with free BI tools and sample datasets</li>
                  <li>• Reassess after 3-6 months of preparation</li>
                </ul>
              </div>
            )}
            
            {getRecommendation() === "No" && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold text-destructive mb-2">Alternative Paths:</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Consider Excel-based analytics roles first</li>
                  <li>• Explore Data Storytelling with simpler tools</li>
                  <li>• Look into operational reporting roles</li>
                  <li>• Build foundational analytical skills before BI tools</li>
                </ul>
              </div>
            )}
            
            <div className="flex justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary-hover">
                Download Detailed Report
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};