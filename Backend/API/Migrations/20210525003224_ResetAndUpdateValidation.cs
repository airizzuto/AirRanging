using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AirRangingAPI.Migrations
{
    public partial class ResetAndUpdateValidation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aircrafts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IcaoId = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: false),
                    Manufacturer = table.Column<string>(type: "text", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    Variant = table.Column<string>(type: "text", nullable: true),
                    Registration = table.Column<string>(type: "text", nullable: true),
                    AircraftType = table.Column<string>(type: "text", nullable: false),
                    EngineType = table.Column<string>(type: "text", nullable: false),
                    EngineCount = table.Column<short>(type: "smallint", nullable: false),
                    WeightCategory = table.Column<string>(type: "text", nullable: false),
                    IcaoWakeCategory = table.Column<string>(type: "text", nullable: false),
                    FuelType = table.Column<string>(type: "text", nullable: false),
                    MaxTakeoffWeight = table.Column<int>(type: "integer", nullable: false),
                    CruiseSpeed = table.Column<int>(type: "integer", nullable: false),
                    FuelCapacity = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxRange = table.Column<decimal>(type: "numeric", nullable: false),
                    ServiceCeiling = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aircrafts", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Aircrafts",
                columns: new[] { "Id", "AircraftType", "CruiseSpeed", "EngineCount", "EngineType", "FuelCapacity", "FuelType", "IcaoId", "IcaoWakeCategory", "Manufacturer", "MaxRange", "MaxTakeoffWeight", "Model", "Registration", "ServiceCeiling", "Variant", "WeightCategory" },
                values: new object[,]
                {
                    { -100, "SingleEngineLand", 107, (short)1, "Piston", 26m, "AvGas", "C152", "Light", "Cessna", 415m, 1670, "152", null, 14700, null, "Small" },
                    { -99, "SingleEngineLand", 107, (short)1, "Piston", 38m, "AvGas", "C152", "Light", "Cessna", 691m, 1670, "152", null, 14700, "Long-Range", "Small" },
                    { -98, "SingleEngineLand", 122, (short)1, "Piston", 56m, "AvGas", "C172", "Light", "Cessna", 696m, 2450, "172", null, 13500, null, "Small" },
                    { -97, "MultiEngineLand", 447, (short)2, "Jet", 6400m, "JetA", "A320", "Medium", "Airbus", 3300m, 172000, "320", null, 39100, null, "Large" },
                    { -96, "MultiEngineLand", 453, (short)2, "Jet", 6875m, "JetA", "B758", "Medium", "Boeing", 2935m, 144500, "737-800", null, 41000, null, "Large" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aircrafts");
        }
    }
}
