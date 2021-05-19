using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AirRangingAPI.Migrations
{
    public partial class AddAircraftsToDB : Migration
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
                    AircraftType = table.Column<int>(type: "integer", nullable: false),
                    EngineType = table.Column<int>(type: "integer", nullable: false),
                    WeightCategory = table.Column<int>(type: "integer", nullable: false),
                    IcaoWakeCategory = table.Column<int>(type: "integer", nullable: false),
                    FuelType = table.Column<int>(type: "integer", nullable: false),
                    MTOW = table.Column<int>(type: "integer", nullable: false),
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
                columns: new[] { "Id", "AircraftType", "CruiseSpeed", "EngineType", "FuelCapacity", "FuelType", "IcaoId", "IcaoWakeCategory", "MTOW", "Manufacturer", "MaxRange", "Model", "ServiceCeiling", "Variant", "WeightCategory" },
                values: new object[,]
                {
                    { -100, 1, 107, 1, 26m, 0, "C152", 2, 0, "Cessna", 415m, "152", 14700, null, 3 },
                    { -99, 1, 107, 1, 38m, 0, "C152", 2, 0, "Cessna", 691m, "152", 14700, "Long-Range", 3 },
                    { -98, 1, 122, 1, 56m, 0, "C172", 2, 0, "Cessna", 696m, "172", 13500, null, 3 },
                    { -97, 1, 447, 3, 6400m, 1, "A320", 1, 172000, "Airbus", 3300m, "320", 39100, null, 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Aircrafts");
        }
    }
}
