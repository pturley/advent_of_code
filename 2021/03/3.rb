class Three
  def initialize()
    file = File.open("input3.txt")
    @lines = file.readlines.map(&:chomp).map { |line| line.split('') }
  end

  def gamma(lines)
    gamma = []
    (0..(lines[0].length - 1)).each do |column_index|
      column = lines.map { |line| line[column_index] }
      tally = column.tally
      gamma[column_index] = (tally["0"] || 0) > (tally["1"] || 0) ? "0" : "1"
    end
    gamma
  end

  def epsilon(lines)
    epsilon = []
    (0..(lines[0].length - 1)).each do |column_index|
      column = lines.map { |line| line[column_index] }
      tally = column.tally
      epsilon[column_index] = (tally["0"] || 0) > (tally["1"] || 0) ? "1" : "0"
    end
    epsilon
  end

  def part1()
    gamma(@lines).join.to_i(2) * epsilon(@lines).join.to_i(2)
  end

  def part2()
    o2_possibilities = @lines.dup
    co2_possibilities = @lines.dup
    (0..(@lines[0].length - 1)).each do |column_index|
      o2_gamma = gamma(o2_possibilities)[column_index]
      co2_epsilon = epsilon(co2_possibilities)[column_index]
      o2_possibilities.delete_if { |line| line[column_index] != o2_gamma } unless o2_possibilities.length == 1
      co2_possibilities.delete_if { |line| line[column_index] != co2_epsilon } unless co2_possibilities.length == 1
    end

    o2_possibilities[0].join.to_i(2) * co2_possibilities[0].join.to_i(2)
  end
end

three = Three.new

puts "Part 1: #{three.part1()}"
puts "Part 2: #{three.part2()}"
