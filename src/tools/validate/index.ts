import { RuleItem } from "async-validator";
import { rules } from "./rule";

export function isCreateValidateInstance(
  instance: any
): instance is typeof valid {
  return !Array.isArray(instance);
}
export class CreateValidate extends rules {
  /**
   * @description 最终结果
   * @returns {RuleItem[]}
   */
  rules: RuleItem[] = [];
  constructor(rules: RuleItem[] = []) {
    super();
    this.rules = rules;
  }
}

const valid = new CreateValidate();
/**
 * @description 辅助函数
 * @returns rule
 */
export function done(this: any, rules: RuleItem): typeof valid {
  let rule = [...this.rules];

  if (Array.isArray(rules)) rule = [...rules, ...rule];
  else rule.push(rules);

  return new CreateValidate(rule);
}

export default valid;
