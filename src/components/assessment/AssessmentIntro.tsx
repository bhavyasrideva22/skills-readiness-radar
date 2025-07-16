import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart3, Users, TrendingUp, ChevronRight, Zap, Eye, Database, PieChart } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const careerRoles = [
    { title: "Business Intelligence Analyst", desc: "Builds dashboards, extracts KPIs, advises teams" },
    { title: "Data Analyst", desc: "Analyzes trends, answers questions with data" },
    { title: "Data Visualization Specialist", desc: "Designs compelling dashboards and reports" },
    { title: "Operations Analyst", desc: "Uses BI to improve workflows and efficiencies" },
    { title: "BI Developer", desc: "Develops and maintains BI solutions" }
  ];

  const keyFeatures = [
    { icon: Database, title: "Data Analysis", desc: "Transform raw data into actionable insights" },
    { icon: PieChart, title: "Visualization", desc: "Create compelling charts and dashboards" },
    { icon: Eye, title: "Business Intelligence", desc: "Drive data-driven decision making" },
    { icon: TrendingUp, title: "Performance Tracking", desc: "Monitor KPIs and business metrics" }
  ];

  const assessmentHighlights = [
    { icon: Clock, text: "25-30 minutes", desc: "Personalized Results" },
    { icon: BarChart3, text: "Comprehensive Analysis", desc: "Career Guidance" },
    { icon: Users, text: "WISCAR Framework", desc: "Science-Based" }
  ];

  return (
    <div className="space-y-8">
      {/* Main Assessment Card */}
      <Card className="text-center bg-gradient-to-br from-card to-secondary border-2 border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-foreground mb-4">
            Discover Your Power BI & Tableau Career Potential
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Take our comprehensive assessment to evaluate your psychological fit, 
            technical readiness, and career alignment for a future in Power BI and Tableau 
            development and business intelligence.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {assessmentHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item.text}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.desc}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          <Button 
            onClick={onStart} 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-lg px-8 py-3 h-auto"
          >
            Start Assessment
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* What are Power BI & Tableau */}
      <Card className="bg-gradient-to-r from-accent/10 to-warning/10 border border-accent/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-6 w-6 text-accent" />
            <CardTitle className="text-2xl text-foreground">What Are Power BI & Tableau Used For?</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Power BI (Microsoft) and Tableau (Salesforce) are leading business intelligence (BI) and 
            data visualization platforms. They allow users to analyze data, create dashboards, and 
            make data-driven decisions.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-card p-4 rounded-lg border border-border">
                  <Icon className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-foreground">Career Opportunities</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="bg-secondary/50 p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">{role.title}</h4>
                <p className="text-sm text-muted-foreground">{role.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Who Excels */}
      <Card className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">🧩 Who Excels at This?</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "High attention to detail",
              "Loves patterns, insights, and trends", 
              "Visual communicator",
              "Structured and analytical mindset",
              "Curious and patient",
              "Comfortable with data and logic"
            ].map((trait, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm text-foreground">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};