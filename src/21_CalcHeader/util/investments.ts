type InvestmentInput = {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: number;
  interest: number;
  investmentValue: number;
  totalInterest: number;
  investedCapital: number;
};

export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}: InvestmentInput): InvestmentResult[] {
  const annualData: InvestmentResult[] = [];
  let investmentValue: number = initialInvestment;
  let totalInterest: number = 0;
  let investedCap: number = initialInvestment;
  for (let i: number = 0; i < duration; i++) {
    const interestEarnedInYear: number =
      investmentValue * (expectedReturn / 100);
    totalInterest += interestEarnedInYear;
    investedCap += annualInvestment;
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      investmentValue: investmentValue,
      totalInterest: totalInterest,
      investedCapital: investedCap,
    });
  }
  return annualData;
}
